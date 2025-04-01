import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { OutfitsTagEntity } from '../entity/tag';

/**
 * 标签
 */
@Provide()
export class OutfitsTagService extends BaseService {
  @InjectEntityModel(OutfitsTagEntity)
  outfitsTagEntity: Repository<OutfitsTagEntity>;
}
