import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { OrderLogisticsLocationEntity } from '../entity/logistics_location';

/**
 * 物流位置记录
 */
@Provide()
export class OrderLogisticsLocationService extends BaseService {
  @InjectEntityModel(OrderLogisticsLocationEntity)
  orderLogisticsLocationEntity: Repository<OrderLogisticsLocationEntity>;
}
