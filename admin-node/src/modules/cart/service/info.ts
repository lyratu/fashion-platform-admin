import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { CartInfoEntity } from '../entity/info';

/**
 * 购物车信息
 */
@Provide()
export class CartInfoService extends BaseService {
  @InjectEntityModel(CartInfoEntity)
  cartInfoEntity: Repository<CartInfoEntity>;
}
