import { Inject, Query } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { OrderOrderEntity } from '../../entity/order';
import { OrderOrderService } from '../../service/order';
import { BaseSysUserEntity } from '../../../base/entity/sys/user';

/**
 * 订单信息
 */
@CoolController({
  api: ['page', 'info'],
  entity: OrderOrderEntity,
  service: OrderOrderService,
  pageQueryOp: {
    keyWordLikeFields: ['a.orderNumber'],
    fieldEq: ['a.paymentStatus', 'a.userId'],
    select: ['a.*', 'b.nickName'],
    join: [
      {
        entity: BaseSysUserEntity,
        alias: 'b',
        condition: 'a.userId = b.id',
        type: 'leftJoin',
      },
    ],
    where: async ctx => {
      const { startTime, endTime } = ctx.request.body;
      const where = [];
      if (startTime && endTime) {
        where.push([
          'a.createTime BETWEEN :startTime AND :endTime',
          { startTime, endTime },
        ]);
      }
      return where;
    },
    addOrderBy: {
      createTime: 'DESC',
    },
  },
})
export class AdminOrderOrderController extends BaseController {
  @Inject()
  orderOrderService: OrderOrderService;
}
