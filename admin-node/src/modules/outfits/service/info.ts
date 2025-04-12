import { Inject, Provide } from '@midwayjs/core';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository, QueryRunner, In } from 'typeorm';
import { OutfitsInfoEntity } from '../entity/info';
import { UserInfoEntity } from '../../user/entity/info';
import { join } from 'path';
import { DictInfoService } from '../../dict/service/info';
import { OutfitsTagService } from './tag';
import { OutfitsTagEntity } from '../entity/tag';
import { OutfitsLikeEntity } from '../entity/like';
import { DictInfoEntity } from '../../dict/entity/info';
// [ ] -4/11 完成文章 评论点赞收藏更新数量，文章评论发表 及获取 注意评论获取的点赞状态
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

  @Inject()
  ctx;

  async modifyBefore(data: any, type: 'delete' | 'update' | 'add') {
    if (type === 'update') {
      const num = await this.outfitsInfoEntity.countBy({ isFeature: 1 });
      if (num > 1 && data.isFeature) {
        throw new CoolCommException('最多只能精选两篇文章~');
      }
    }
  }

  /* 更新点赞量 */
  async incrementLikeCount(id: number) {
    await this.outfitsInfoEntity.increment({ id }, 'likeCount', 1);
    const updatedComment = await this.outfitsInfoEntity.findOne({
      where: { id },
    });
    return updatedComment.likeCount;
  }

  async decrementLikeCount(id: number) {
    await this.outfitsInfoEntity.decrement({ id }, 'likeCount', 1);
    const updatedComment = await this.outfitsInfoEntity.findOne({
      where: { id },
    });
    return updatedComment.likeCount;
  }

  /* 更新收藏量 */
  async incrementCollectCount(id: number) {
    await this.outfitsInfoEntity.increment({ id }, 'collectCount', 1);
    const updatedComment = await this.outfitsInfoEntity.findOne({
      where: { id },
    });
    return updatedComment.collectCount;
  }

  /* 更新评论量 */
  async updateCommentCount(id: number, count: number) {
    return await this.outfitsInfoEntity.update(id, { commentCount: count });
  }

  async decrementCollectCount(id: number) {
    await this.outfitsInfoEntity.decrement({ id }, 'collectCount', 1);
    const updatedComment = await this.outfitsInfoEntity.findOne({
      where: { id },
    });
    return updatedComment.collectCount;
  }

  // 相关文章推荐
  async getRelatedArticles(id: number) {
    let recommendations = [];
    const currentArticle = await this.outfitsInfoEntity.findOne({
      relations: {
        tags: true,
      },
      where: { id },
    });
    const currentArticleTags = currentArticle.tags.map(tag => tag.name);
    if (currentArticleTags.length > 0)
      recommendations = await this.outfitsInfoEntity
        .createQueryBuilder('article')
        // 关联 tags
        .leftJoinAndSelect('article.tags', 'tag')
        .leftJoinAndMapOne(
          'article.categoryText', // 将整个 DictInfoEntity 映射到该属性上
          DictInfoEntity,
          'd',
          'd.value = article.category AND d.typeId = :typeId',
          { typeId: 21 }
        )
        // 排除当前文章
        .where('article.id != :id', { id })
        .andWhere('tag.name IN (:...names)', { names: currentArticleTags })
        .limit(3)
        .getMany();
    else recommendations = [];
    return recommendations;
  }

  // 获取文章信息
  async info(params: any) {
    const data = await this.outfitsInfoEntity
      .createQueryBuilder('a') // 主表别名为 a
      .leftJoinAndSelect('a.user', 'b') // 关联 user 表，别名为 b
      .leftJoinAndSelect('a.tags', 'c') // 关联 tags 表，别名为 c
      .leftJoinAndMapOne(
        'a.categoryText', // 将整个 DictInfoEntity 映射到该属性上
        DictInfoEntity,
        'd',
        'd.value = a.category AND d.typeId = :typeId',
        { typeId: 21 }
      )
      .leftJoinAndSelect('a.likes', 'like', 'like.userId = :currentUserId', {
        currentUserId: this.ctx.user.id,
      })
      .leftJoinAndSelect(
        'a.collects',
        'collect',
        'collect.userId = :currentUserId',
        {
          currentUserId: this.ctx.user.id,
        }
      )
      .select([
        'a', // 主表所有字段（相当于 a.*）
        'like.likeStatus',
        'collect.collectStatus',
        'b.id', // user 表的 authId
        'b.nickName', // user 表的 nickname
        'b.avatarUrl',
        'b.position',
        'c.name', // tags 表的 name
        'c.id', // tags 表的 id
        'd.name',
      ])
      .where('a.id = :id', { id: params }) // 条件过滤
      .getOne(); // 获取单个结果
    /* 获取当前用户点赞状态 */
    data.likeStatus = data.likes[0]?.likeStatus || 0;
    delete data.likes;
    /* 获取当前用户收藏状态 */
    data.collectStatus = data.collects[0]?.collectStatus || 0;
    delete data.collects;
    return data;
  }

  // 获取穿搭精选文章列表 type=1 根据是否精选  type=0 根据点赞数
  async getOutfitsRec(type: number) {
    let list = null;
    if (type) {
      list = await this.outfitsInfoEntity
        .createQueryBuilder('outfits')
        .leftJoinAndSelect('outfits.user', 'user')
        .leftJoinAndMapOne(
          'outfits.categoryText', // 将整个 DictInfoEntity 映射到该属性上
          DictInfoEntity,
          'c',
          'c.value = outfits.category AND c.typeId = :typeId',
          { typeId: 21 }
        )
        .where('outfits.isFeature = :isFeature', { isFeature: 1 })
        .orderBy('outfits.isFeature', 'DESC')
        .select([
          'outfits',
          'user.id',
          'user.nickName',
          'user.avatarUrl',
          'user.position',
          'c.name',
          'c.typeId',
          'c.value',
        ])
        .limit(2)
        .getMany();
    } else {
      list = await this.outfitsInfoEntity
        .createQueryBuilder('outfits')
        .leftJoinAndSelect('outfits.user', 'user')
        .leftJoinAndMapOne(
          'outfits.categoryText', // 将整个 DictInfoEntity 映射到该属性上
          DictInfoEntity,
          'c',
          'c.value = outfits.category AND c.typeId = :typeId',
          { typeId: 21 }
        )
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
          'c.name',
          'c.typeId',
          'c.value',
        ])
        .limit(3)
        .getMany();
    }
    return list;
  }
}
