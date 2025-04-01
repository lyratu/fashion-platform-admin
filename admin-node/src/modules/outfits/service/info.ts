import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository, QueryRunner } from 'typeorm';
import { OutfitsInfoEntity } from '../entity/info';
import { UserInfoEntity } from '../../user/entity/info';
import { join } from 'path';
import { DictInfoService } from '../../dict/service/info';
import { OutfitsTagService } from './tag';

/**
 * 穿搭信息
 */
@Provide()
export class OutfitsInfoService extends BaseService {
  @InjectEntityModel(OutfitsInfoEntity)
  outfitsInfoEntity: Repository<OutfitsInfoEntity>;

  @Inject()
  dictInfoService: DictInfoService;

  async modifyBefore(data: any, type: 'update' | 'add'): Promise<void> {
    const types = await this.dictInfoService.data([]);
    const obj = types['category'].find(e => e.value == data.category);
    data.categoryText = obj?.name;
  }

  async info(params: any) {
    const data = await this.outfitsInfoEntity
      .createQueryBuilder('a') // 主表别名为 a
      .leftJoinAndSelect('a.user', 'b') // 关联 user 表，别名为 b
      .leftJoinAndSelect('a.tags', 'c') // 关联 tags 表，别名为 c
      .select([
        'a', // 主表所有字段（相当于 a.*）
        'b.id', // user 表的 authId
        'b.nickName', // user 表的 nickname
        'c.name', // tags 表的 name
        'c.id', // tags 表的 id
      ])
      .where('a.id = :id', { id: params }) // 条件过滤
      .getOne(); // 获取单个结果

    return data;
  }

  async getOutfitsRec(type: number) {
    let list = null;
    if (type) {
      list = await this.outfitsInfoEntity
        .createQueryBuilder('outfits')
        .leftJoinAndSelect('outfits.user', 'user')
        .orderBy('outfits.isFeature', 'DESC')
        .select(['outfits', 'user.id', 'user.nickName'])
        .limit(2)
        .getMany();
    } else {
      list = await this.outfitsInfoEntity
        .createQueryBuilder('outfits')
        .leftJoinAndSelect('outfits.user', 'user')
        .orderBy('outfits.likeCount', 'DESC')
        .select(['outfits', 'user.id', 'user.nickName'])
        .limit(3)
        .getMany();
    }

    return list;
  }
}
