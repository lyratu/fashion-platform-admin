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
    // [ ] 点赞逻辑待确认
    const [list, total] = await this.commentInfoEntity
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.user', 'user')
      .leftJoinAndSelect('c.children', 'children')
      .leftJoinAndSelect('children.user', 'childUser')
      // .leftJoinAndSelect('children.replyTo', 'replyTo')
      // .leftJoinAndSelect('replyTo.user', 'replyUser') // 添加这一行加载 replyTo 的用户信息
      // 查询条件：objectId 为传入的 id 且 parent 为空（一级评论）
      .where('c.objectId = :id AND c.parent IS NULL', { id })
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
    replyTo?: string
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
      console.log('parentComment', parentComment);
      if (!parentComment) {
        throw new CoolCommException('回复失败，评论已被删除');
      }
      comment.parent = parentComment;
      replyTo ? (comment.replyTo = replyTo) : '';
    }
    return await this.commentInfoEntity.save(comment);
  }

  /**
   * 删除评论
   * @param id
   */
  async deleteComment(id: number, type: number) {
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
}
