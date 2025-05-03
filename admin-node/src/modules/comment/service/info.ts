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
  //[ ] 这里逻辑需要修复，然后检查文章评论的其他功能实现，另外需要写社区模块的评论发布
  async getPageComment(type: number, id: string, page: number, limit: number) {
    const uid = this.ctx.user.id;
    const [list, total] = await this.commentInfoEntity
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.user', 'user')
      .leftJoinAndSelect('c.children', 'children')
      .leftJoinAndSelect('children.user', 'childUser')
      .loadRelationCountAndMap(
        'children.likeStatus',
        'children.likes',
        'like',
        qb =>
          qb.andWhere('like.likeStatus = :status And like.userId = :uid', {
            status: 1,
            uid,
          })
      )
      .loadRelationCountAndMap('c.likeStatus', 'c.likes', 'like', qb =>
        qb.andWhere('like.likeStatus = :status And like.userId = :uid', {
          status: 1,
          uid,
        })
      )
      .where('c.objectId = :id AND c.parent IS NULL AND c.type = :type', {
        id,
        type,
      })
      .orderBy('c.createTime', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
    return { list, total };
  }

  /**
   * 创建评论
   * @param content 评论内容
   * @param parentId （可选）如果传入，表示该评论属于哪个上级评论
   * @param replyTo （可选）如果传入，表示回复的目标评论（显示时可以标识“回复给谁”）
   */
  async createComment(
    type: number,
    objectId: number,
    content: string,
    parentId?: number,
    replyTo?: string,
    replyToId?: number
  ): Promise<CommentInfoEntity> {
    const comment = new CommentInfoEntity();
    comment.type = type;
    comment.objectId = objectId;
    comment.content = content;
    comment.userId = this.ctx.user.id;
    if (parentId) {
      const parentComment = await this.commentInfoEntity.findOne({
        where: { id: parentId },
      });
      if (!parentComment) {
        throw new CoolCommException('回复失败，评论已被删除');
      }
      comment.parent = parentComment;
      replyTo ? (comment.replyTo = replyTo) : '';
    }
    replyToId ? (comment.replyToId = replyToId) : '';
    return await this.commentInfoEntity.save(comment);
  }

  /**
   * 删除评论
   * @param id
   */
  async deleteComment(params: { id: number; type: number }) {
    const { id, type } = params;
    const comment = await this.commentInfoEntity.findOne({
      where: { id, type },
    });
    if (comment.userId == this.ctx.user.id)
      await this.commentInfoEntity.delete(id);
    else throw new CoolCommException('无权删除该评论');
  }

  /**
   * 获取更多评论
   * @param id
   */
  async getCommentInfo(id: number) {
    return this.commentInfoEntity.findOneBy({ id });
  }
  /* 增加点赞数 */
  async incrementLikeCount(commentId: number) {
    await this.commentInfoEntity.increment({ id: commentId }, 'likeCount', 1);
    const updatedComment = await this.commentInfoEntity.findOne({
      where: { id: commentId },
    });
    return updatedComment.likeCount;
  }
  /* 增加点赞数减少 */
  async decrementLikeCount(commentId: number) {
    await this.commentInfoEntity.decrement({ id: commentId }, 'likeCount', 1);
    const updatedComment = await this.commentInfoEntity.findOne({
      where: { id: commentId },
    });
    return updatedComment.likeCount;
  }

  /* 获取评论回复通知 */
  async getReply() {
    const { id: userId } = this.ctx.user;
    await this.commentInfoEntity.find({
      where: {
        userId,
      },
    });
  }
  async list(query: any, option: any, connectionName?: any): Promise<any> {
    const result = super.list(query, option, connectionName);
    return result;
  }
}
