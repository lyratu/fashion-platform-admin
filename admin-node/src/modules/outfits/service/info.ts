import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository, QueryRunner } from 'typeorm';
import { OutfitsInfoEntity } from '../entity/info';
import { UserInfoEntity } from '../../user/entity/info';
import { join } from 'path';

/**
 * 穿搭信息
 */
@Provide()
export class OutfitsInfoService extends BaseService {
  @InjectEntityModel(OutfitsInfoEntity)
  outfitsInfoEntity: Repository<OutfitsInfoEntity>;

  async info(params: any) {
    return await this.outfitsInfoEntity.findOne({
      where: { id: params },
      relations: {
        user: true,
      },
    });
  }

  async getOutfitsRec(type: number) {
    let list = null;
    if (type) {
      list = await this.outfitsInfoEntity
        .createQueryBuilder('outfits')
        .leftJoinAndSelect('outfits.user', 'user')
        .orderBy('outfits.isFeature', 'DESC')
        .limit(2)
        .getMany();
    } else {
      list = await this.outfitsInfoEntity
        .createQueryBuilder('outfits')
        .leftJoinAndSelect('outfits.user', 'user')
        .orderBy('outfits.likeCount', 'DESC')
        .limit(3)
        .getMany();
    }

    return list;
  }
}
