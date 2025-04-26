import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { OrderOrderEntity } from '../../entity/order';
import { OrderLogisticsLocationService } from '../../service/logisticsLocation';
import { OrderLogisticsLocationEntity } from '../../entity/logisticsLocation';
import { OrderLogisticsEntity } from '../../entity/logistics';

/**
 * 物流信息
 */
@CoolController({
  api: ['page'],
  entity: OrderLogisticsLocationEntity,
  service: OrderLogisticsLocationService,
  pageQueryOp: {
    keyWordLikeFields: [],
    fieldEq: ['b.logisticsNumber'],
    select: ['a.*', 'b.logisticsNumber'],
    join: [
      {
        entity: OrderLogisticsEntity,
        alias: 'b',
        condition: 'a.logisticsId = b.id',
        type: 'leftJoin',
      },
    ],
  },
})
export class OrderLocationController extends BaseController {
  @Inject()
  orderLogisticsLocationService: OrderLogisticsLocationService;
}
