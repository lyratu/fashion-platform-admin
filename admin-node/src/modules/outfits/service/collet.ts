import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { OutfitsColletEntity } from './../entity/collect';

/**
 * 标签
 */
@Provide()
export class OutfitsColletService extends BaseService {
  @InjectEntityModel(OutfitsColletEntity)
  outfitsColletEntity: Repository<OutfitsColletEntity>;
}
