import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository, QueryRunner, In } from 'typeorm';
import { OutfitsInfoEntity } from '../entity/info';
import { UserInfoEntity } from '../../user/entity/info';
import { join } from 'path';
import { DictInfoService } from '../../dict/service/info';
import { OutfitsTagService } from './tag';
import { OutfitsTagEntity } from '../entity/tag';
import { OutfitsLikeEntity } from '../entity/like';

/**
 * 穿搭信息
 */
@Provide()
export class OutfitsInfoService extends BaseService {
  @InjectEntityModel(OutfitsInfoEntity)
  outfitsInfoEntity: Repository<OutfitsInfoEntity>;

  @Inject()
  dictInfoService: DictInfoService;

  @InjectEntityModel(OutfitsTagEntity)
  outfitsTagEntity: Repository<OutfitsTagEntity>;

  async modifyBefore(data: any, type: 'update' | 'add'): Promise<void> {
    const types = await this.dictInfoService.data([]);
    const obj = types['category'].find(e => e.value == data.category);
    data.categoryText = obj?.name;
  }

  // 相关文章推荐
  async getRelatedArticles(id: number) {
    const currentArticle = await this.outfitsInfoEntity.findOne({
      relations: {
        tags: true,
      },
      where: { id },
    });
    const currentArticleTags = currentArticle.tags.map(tag => tag.name);
    const recommendations = await this.outfitsInfoEntity
      .createQueryBuilder('article')
      // 关联 tags
      .leftJoinAndSelect('article.tags', 'tag')
      // 排除当前文章
      .where('article.id != :id', { id })
      .andWhere('tag.name IN (:...names)', { names: currentArticleTags })
      .limit(3)
      .getMany();
    return recommendations;
  }

  // 获取文章信息
  async info(params: any) {
    const data = await this.outfitsInfoEntity
      .createQueryBuilder('a') // 主表别名为 a
      .leftJoinAndSelect('a.user', 'b') // 关联 user 表，别名为 b
      .leftJoinAndSelect('a.tags', 'c') // 关联 tags 表，别名为 c
      .loadRelationCountAndMap('a.likeCount', 'a.likes', 'like', qb =>
        qb.andWhere('like.likeStatus = :status', { status: 1 })
      )
      .loadRelationCountAndMap('a.collectCount', 'a.collects', 'collect', qb =>
        qb.andWhere('collect.collectStatus = :status', { status: 1 })
      )
      .select([
        'a', // 主表所有字段（相当于 a.*）
        'b.id', // user 表的 authId
        'b.nickName', // user 表的 nickname
        'b.avatarUrl',
        'b.position',
        'c.name', // tags 表的 name
        'c.id', // tags 表的 id
      ])
      .where('a.id = :id', { id: params }) // 条件过滤
      .getOne(); // 获取单个结果

    return data;
  }

  // 获取穿搭精选文章列表
  async getOutfitsRec(type: number) {
    let list = null;
    if (type) {
      list = await this.outfitsInfoEntity
        .createQueryBuilder('outfits')
        .leftJoinAndSelect('outfits.user', 'user')
        .orderBy('outfits.isFeature', 'DESC')
        .select([
          'outfits',
          'user.id',
          'user.nickName',
          'user.avatarUrl',
          'user.position',
        ])
        .limit(2)
        .getMany();
    } else {
      list = await this.outfitsInfoEntity
        .createQueryBuilder('outfits')
        .leftJoinAndSelect('outfits.user', 'user')
        .loadRelationCountAndMap(
          'outfits.likeCount',
          'outfits.likes',
          'like',
          qb => qb.andWhere('like.likeStatus = :status', { status: 1 })
        )
        .orderBy('outfits.likeCount', 'DESC') // 注意这里改为 likesCount 而不是 likeCount
        .select([
          'outfits',
          'user.id',
          'user.nickName',
          'user.avatarUrl',
          'user.position',
        ])
        .limit(3)
        .getMany();
    }

    return list;
  }
}
