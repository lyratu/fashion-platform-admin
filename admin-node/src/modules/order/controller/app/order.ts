import { Body, Inject, Post, Query } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { OrderOrderEntity } from '../../entity/order';
import { OrderOrderService } from '../../service/order';
import { UserInfoEntity } from '../../../user/entity/info';
import { OrderItemEntity } from '../../entity/item';

/**
 * 订单
 */
@CoolController({
  api: ['page', 'info'],
  entity: OrderOrderEntity,
  service: OrderOrderService,
  pageQueryOp: {
    keyWordLikeFields: ['a.orderNumber'],
    fieldEq: ['a.payStatus'],
    where: async ctx => {
      const { id: userId } = ctx.user;
      return [['a.userId = :userId', { userId }]];
    },
    select: ['a.*', 'b.nickName', 'b.avatarUrl'],
    join: [
      {
        entity: UserInfoEntity,
        alias: 'b',
        condition: 'a.userId = b.id',
        type: 'leftJoin',
      },
    ],
  },
})
export class AppOrderOrderController extends BaseController {
  @Inject()
  orderOrderService: OrderOrderService;

  @Inject()
  ctx;

  @Post('/createOrder', { summary: '创建订单' })
  async createOrder(
    @Body()
    body: {
      paymentType: number;
      totalAmount: number;
      address: string;
      contactNumber: string;
    }
  ) {
    return this.ok(await this.orderOrderService.createOrder(body));
  }
  @Post('/confirmPayment', { summary: '确认支付' })
  async confirmPayment(@Query('id') id: number) {
    return this.ok(await this.orderOrderService.confirmPayment(id));
  }
}
