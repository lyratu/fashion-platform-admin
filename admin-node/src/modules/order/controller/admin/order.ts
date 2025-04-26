import { Inject, Query } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { OrderOrderEntity } from '../../entity/order';
import { OrderOrderService } from '../../service/order';
import { UserInfoEntity } from '../../../user/entity/info';

/**
 * 订单信息
 */
@CoolController({
  api: ['page', 'info', 'update'],
  entity: OrderOrderEntity,
  service: OrderOrderService,
  pageQueryOp: {
    keyWordLikeFields: ['a.orderNumber', 'b.nickName'],
    fieldEq: ['a.payStatus'],
    select: ['a.*', 'b.nickName'],
    join: [
      {
        entity: UserInfoEntity,
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
