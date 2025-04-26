import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { OrderLogisticsEntity } from '../../entity/logistics';
import { OrderLogisticsService } from '../../service/logistics';
import { OrderOrderEntity } from '../../../order/entity/order';

/**
 * 物流信息
 */
@CoolController({
  api: ['page', 'info', 'update', 'delete', 'add'],
  entity: OrderLogisticsEntity,
  service: OrderLogisticsService,
  pageQueryOp: {
    keyWordLikeFields: ['a.logisticsCompany', 'a.logisticsNumber'],
    fieldEq: ['b.orderNumber', 'a.logisticsStatus'],
    select: ['a.*', 'b.orderNumber'],
    join: [
      {
        entity: OrderOrderEntity,
        alias: 'b',
        condition: 'a.orderId = b.id',
        type: 'leftJoin',
      },
    ],
  },
})
export class AdminOrderLogisticsController extends BaseController {
  @Inject()
  orderLogisticsService: OrderLogisticsService;
}
