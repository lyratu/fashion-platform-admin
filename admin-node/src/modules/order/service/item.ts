import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItemEntity } from '../entity/item';

/**
 * 订单商品
 */
@Provide()
export class OrderItemService extends BaseService {
  @InjectEntityModel(OrderItemEntity)
  orderItemEntity: Repository<OrderItemEntity>;
}
