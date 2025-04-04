import { Inject, Provide } from '@midwayjs/core';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { CommentInfoEntity } from '../entity/info';

/**
 * 评论信息
 */
@Provide()
export class CommentInfoService extends BaseService {
  @InjectEntityModel(CommentInfoEntity)
  commentInfoEntity: Repository<CommentInfoEntity>;

  @Inject()
  ctx;

  // 获取高赞评论
  async getCommentRec() {
    const list = await this.commentInfoEntity
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.user', 'user')
      .orderBy('c.likeCount', 'DESC')
      .where('c.type = 0')
      .limit(3)
      .getMany();
    return list;
  }

  // 获取页面评论列表
  async getPageComment(id: string, page: number, limit: number) {
    const currentUserId = this.ctx.user.id;
    const [list, total] = await this.commentInfoEntity
      .createQueryBuilder('c')
      // 关联用户信息
      .leftJoinAndSelect('c.user', 'user')
      // 关联子评论
      .leftJoinAndSelect('c.children', 'children')
      // 统计点赞数（只统计状态为1的点赞记录）
      .loadRelationCountAndMap('c.likeCount', 'c.likes', 'like', qb =>
        qb.andWhere('like.likeStatus = :status', { status: 1 })
      )
      // 根据传入的 userId 判断该用户是否点赞（如果有对应的记录，则 isLike 为 true）
      .leftJoin(
        'c.likes',
        'userLike',
        'userLike.userId = :currentUserId AND userLike.likeStatus = :status',
        { currentUserId, status: 1 }
      )
      // 利用 addSelect 添加计算字段 isLike
      .addSelect(
        'CASE WHEN userLike.id IS NOT NULL THEN true ELSE false END',
        'isLike'
      )
      // 查询条件：objectId 为传入的 id 且 rootId 为 NULL 的父评论
      .where('c.objectId = :id AND c.rootId IS NULL', { id })
      // 根据创建时间倒序排序
      .orderBy('c.createTime', 'DESC')
      // 分页：跳过前面 (page - 1) * limit 条记录，取 limit 条记录
      .skip((page - 1) * limit)
      .take(limit)
      // 同时返回数据列表和符合条件的总数
      .getManyAndCount();
    return { list, total };
  }

  /**
   * 添加评论
   * @param param
   */
  async addComment(objectId: number, content: string, type: number) {
    const comment = {
      objectId,
      content,
      userId: this.ctx.user.id,
      type,
    };
    console.log(
      '%c [ comment ]-47',
      'font-size:13px; background:pink; color:#bf2c9f;',
      comment
    );

    await this.commentInfoEntity.insert(comment);
  }

  /**
   * 回复根评论
   * @param param
   */
  async replyRComment(
    id: number,
    content: string,
    rootId: number,
    type: number
  ) {
    const comment = {
      objectId: id,
      content,
      userId: this.ctx.user.id,
      rootId,
    };
    await this.commentInfoEntity.insert(comment);
  }

  /**
   * 回复子评论
   * @param param
   */
  async replyEComment(
    id: number,
    content: string,
    rootId: number,
    parentId: number,
    type: number
  ) {
    const comment = {
      objectId: id,
      content,
      userId: this.ctx.user.id,
      rootId,
      parentId,
    };
    await this.commentInfoEntity.insert(comment);
  }

  /**
   * 删除评论
   * @param id
   */
  async deleteComment(id: number, type: number) {
    await this.commentInfoEntity.delete(id);
  }

  /**
   * 获取更多评论
   * @param id
   */
  async getCommentInfo(id: number) {
    return this.commentInfoEntity.findOneBy({ id });
  }
}
