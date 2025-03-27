import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { OrderOrderEntity } from '../entity/order';

/**
 * 订单信息
 */
@Provide()
export class OrderOrderService extends BaseService {
  @InjectEntityModel(OrderOrderEntity)
  orderOrderEntity: Repository<OrderOrderEntity>;
}
