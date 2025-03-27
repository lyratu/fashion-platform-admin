import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEvaluateEntity } from '../entity/evaluate';

/**
 * 商品评价
 */
@Provide()
export class OrderEvaluateService extends BaseService {
  @InjectEntityModel(OrderEvaluateEntity)
  orderEvaluateEntity: Repository<OrderEvaluateEntity>;
}
