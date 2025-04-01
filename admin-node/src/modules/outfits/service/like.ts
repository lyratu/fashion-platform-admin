import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { OutfitsLikeEntity } from '../entity/like';

/**
 * 标签
 */
@Provide()
export class OutfitsLikeService extends BaseService {
  @InjectEntityModel(OutfitsLikeEntity)
  outfitsLikeEntity: Repository<OutfitsLikeEntity>;
}
