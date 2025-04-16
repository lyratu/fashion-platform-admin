import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { OrderOrderEntity } from '../entity/order';
import { CoolCommException } from '@cool-midway/core';

/**
 * 订单服务
 */
@Provide()
export class OrderOrderService extends BaseService {
  @Inject()
  ctx;

  @InjectEntityModel(OrderOrderEntity)
  orderOrderEntity: Repository<OrderOrderEntity>;

  /**
   * 下单
   * @param params
   */
  async createOrder(params: any) {
    // 业务逻辑：生成订单号、校验商品库存、计算总金额、创建订单、扣减库存等
    const { userId } = this.ctx.user;
    if (!userId) {
      throw new CoolCommException('用户未登录');
    }
    // 生成订单号
    const orderNumber = Date.now().toString();

    // 创建订单
    await this.orderOrderEntity.insert({
      orderNumber,
      userId,
      totalAmount: params.totalAmount,
      payStatus: 0, // 待支付
      address: params.address,
      contactNumber: params.contactNumber,
      remark: params.remark,
    });

    return { orderNumber };
  }
}
