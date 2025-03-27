import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { OrderEvaluateEntity } from '../../entity/evaluate';
import { OrderEvaluateService } from '../../service/evaluate';
import { UserInfoEntity } from '../../../user/entity/info';
import { OrderOrderEntity } from '../../entity/order';

/**
 * 商品评价
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: OrderEvaluateEntity,
  service: OrderEvaluateService,
  pageQueryOp: {
    keyWordLikeFields: ['a.content'],
    fieldEq: ['a.orderId'],
    where: async ctx => {
      const { evaluateTimeStart, evaluateTimeEnd } = ctx.request.body;
      const where = [];
      if (evaluateTimeStart) {
        where.push([
          'a.evaluateTime >= :evaluateTimeStart',
          { evaluateTimeStart },
        ]);
      }
      if (evaluateTimeEnd) {
        where.push(['a.evaluateTime <= :evaluateTimeEnd', { evaluateTimeEnd }]);
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
      {
        entity: OrderOrderEntity,
        alias: 'c',
        condition: 'a.orderId = c.id',
        type: 'leftJoin',
      },
    ],
    select: ['a.*', 'b.nickName as userName', 'c.goodsName as goodsName'],
  },
})
export class AdminOrderEvaluateController extends BaseController {
  @Inject()
  orderEvaluateService: OrderEvaluateService;
}
