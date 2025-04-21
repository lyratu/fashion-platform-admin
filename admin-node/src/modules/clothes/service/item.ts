import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { ClothesItemEntity } from '../entity/item';

/**
 * 衣物信息
 */
@Provide()
export class ClothesItemService extends BaseService {
  @InjectEntityModel(ClothesItemEntity)
  clothesItemEntity: Repository<ClothesItemEntity>;
}
