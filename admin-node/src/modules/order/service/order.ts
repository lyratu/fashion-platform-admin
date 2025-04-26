import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { In, Repository } from 'typeorm';
import { OrderOrderEntity } from '../entity/order';
import { CoolCommException } from '@cool-midway/core';
import { CartInfoEntity } from '../../cart/entity/info';
import { OrderItemEntity } from '../entity/item';
import { GoodsEntity } from '../../goods/entity/goods';
import * as _ from 'lodash';
/**
 * 订单服务
 */
@Provide()
export class OrderOrderService extends BaseService {
  @Inject()
  ctx;

  @InjectEntityModel(OrderOrderEntity)
  orderOrderEntity: Repository<OrderOrderEntity>;

  @InjectEntityModel(CartInfoEntity)
  cartInfoEntity: Repository<CartInfoEntity>;

  @InjectEntityModel(OrderItemEntity)
  orderItemEntity: Repository<OrderItemEntity>;

  async pageQueryHandler(data: any[]): Promise<any[]> {
    if (!data || data.length === 0) return data;
    // 1. 提取所有的订单 id
    const orderIds = data.map(order => order.id);
    // 2. 批量查询所有的 orderitems（假设 OrderItem 实体中存储订单id的字段为 orderId）
    const orderItems = await this.orderItemEntity.find({
      where: { orderId: In(orderIds) },
    });
    // 3. 根据 orderId 对查询结果进行分组（使用lodash进行分组）
    const orderItemsGrouped = _.groupBy(orderItems, 'orderId');
    // 4. 将分组后的 orderItems 挂载到对应的订单上
    data.forEach(order => {
      order.orderItems = orderItemsGrouped[order.id] || [];
    });
    return data;
  }

  async page(
    query: any,
    option: any,
    connectionName?: any
  ): Promise<{
    list: any;
    pagination: { page: number; size: number; total: number };
  }> {
    const rawData = await super.page(query, option, connectionName);
    // 调用数据后处理，生成嵌套结构
    const processedData = await this.pageQueryHandler(rawData.list);
    return { list: processedData, pagination: rawData.pagination };
  }

  async info(id: any, infoIgnoreProperty?: string[]): Promise<any> {
    const order = await this.orderOrderEntity
      .createQueryBuilder('order')
      // 关联订单项
      .leftJoinAndSelect('order.orderItems', 'item')
      .where('order.orderNumber = :id', { id })
      .getOne();
    return order;
  }

  async confirmPayment(id: number) {
    const order = await this.info(id);
    this.orderOrderEntity.update(order.id, { payStatus: 1 });
  }

  /**
   * 下单
   * @param params
   */
  async createOrder(body: {
    totalAmount: number;
    address: string;
    contactNumber: string;
    paymentType: number;
  }) {
    const { id: userId } = this.ctx.user;
    const { totalAmount, address, contactNumber, paymentType } = body;
    // 业务逻辑检查
    if (!userId) {
      throw new CoolCommException('用户未登录');
    }
    // 生成订单号
    const orderNumber = Date.now().toString();
    // 构造订单实体
    const order = new OrderOrderEntity();
    order.orderNumber = orderNumber;
    order.userId = userId;
    order.totalAmount = totalAmount;
    order.payStatus = 0; // 待支付
    order.address = address;
    order.contactNumber = contactNumber;
    order.paymentType = paymentType;
    // 获取购物车中选中的商品
    const goods = await CartInfoEntity.find({
      relations: ['goods'],
      where: {
        checked: 1,
        userId,
      },
    });
    // 构造订单项，并且设置 order 的引用
    order.orderItems = goods.map(item => {
      const orderItem = new OrderItemEntity();
      orderItem.goodsId = item.goodsId;
      orderItem.mainImage = item.goods.mainImage;
      orderItem.title = item.goods.title;
      orderItem.count = item.count;
      orderItem.price = item.goods.price;
      orderItem.goodsSpecification = `尺码:${item.size},颜色:${item.color}`;
      // 建议设置关联属性，明确表示该订单项属于当前 order
      orderItem.order = order;
      return orderItem;
    });
    // 执行级联保存，此时 order 的数据和 orderItems 的数据将一并插入
    await this.orderOrderEntity.save(order);
    // 订单保存成功后，可按业务需求删除购物车中的商品
    await CartInfoEntity.remove(goods);
    return { orderNumber };
  }

  async confirmGoods(id: number) {
    const status = await this.orderOrderEntity.update(id, {
      payStatus: 3,
    });
    return status;
  }
}
