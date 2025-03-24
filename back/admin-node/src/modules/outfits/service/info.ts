import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository, QueryRunner } from 'typeorm';
import { OutfitsInfoEntity } from '../entity/info';

/**
 * 穿搭信息
 */
@Provide()
export class OutfitsInfoService extends BaseService {
  @InjectEntityModel(OutfitsInfoEntity)
  outfitsInfoEntity: Repository<OutfitsInfoEntity>;

  async getOutfitsRec() {
    const list = await this.outfitsInfoEntity.find({
      order: {
        likeCount: 'DESC',
      },
      take: 3,
    });
    return list;
  }
}
