import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { OrderLogisticsEntity } from '../entity/logistics';

/**
 * 物流信息
 */
@Provide()
export class OrderLogisticsService extends BaseService {
  @InjectEntityModel(OrderLogisticsEntity)
  orderLogisticsEntity: Repository<OrderLogisticsEntity>;
}
