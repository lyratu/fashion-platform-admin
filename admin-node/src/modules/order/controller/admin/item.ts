import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { OrderItemEntity } from '../../entity/item';
import { OrderItemService } from '../../service/item';
import { GoodsEntity } from '../../../goods/entity/goods';

/**
 * 订单商品
 */
@CoolController({
  api: ['page', 'info'],
  entity: OrderItemEntity,
  service: OrderItemService,
  pageQueryOp: {
    fieldEq: ['a.orderId', 'a.goodsId'],
    select: ['a.*', 'b.title AS goodsTitle'],
    join: [
      {
        entity: GoodsEntity,
        alias: 'b',
        condition: 'a.goodsId = b.id',
        type: 'leftJoin',
      },
    ],
  },
})
export class AdminOrderItemController extends BaseController {
  @Inject()
  orderItemService: OrderItemService;
}
