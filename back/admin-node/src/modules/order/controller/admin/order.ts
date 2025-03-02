import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { OrderOrderEntity } from '../../entity/order';
import { OrderOrderService } from '../../service/order';
import { UserInfoEntity } from '../../../user/entity/info';

/**
 * 订单信息
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: OrderOrderEntity,
  service: OrderOrderService,
  pageQueryOp: {
    keyWordLikeFields: ['a.goodsName'],
    fieldEq: ['a.status'],
    where: async ctx => {
      const { orderDateStart, orderDateEnd } = ctx.request.body;
      const where = [];
      if (orderDateStart) {
        where.push(['a.orderDate >= :orderDateStart', { orderDateStart }]);
      }
      if (orderDateEnd) {
        where.push(['a.orderDate <= :orderDateEnd', { orderDateEnd }]);
      }
      return where;
    },
    join: [
      {
        entity: UserInfoEntity,
        alias: 'b',
        condition: 'a.userId = b.id',
        type: 'leftJoin',
      },
    ],
    select: ['a.*', 'b.nickName as userName'],
  },
})
export class AdminOrderOrderController extends BaseController {
  @Inject()
  orderOrderService: OrderOrderService;
}
