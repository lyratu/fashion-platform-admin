import { Inject, Post, Query } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { OrderOrderEntity } from '../../entity/order';
import { OrderOrderService } from '../../service/order';
import { UserInfoEntity } from '../../../user/entity/info';

/**
 * 订单
 */
@CoolController({
  api: ['page'],
  entity: OrderOrderEntity,
  service: OrderOrderService,
  pageQueryOp: {
    keyWordLikeFields: ['a.orderNumber'],
    fieldEq: ['a.payStatus'],
    where: async ctx => {
      const { userId } = ctx.user;
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
  async createOrder(@Query() params: any) {
    return this.ok(await this.orderOrderService.createOrder(params));
  }
}
