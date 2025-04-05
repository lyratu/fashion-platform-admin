import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { CommentLikeEntity } from '../entity/like';
import { CoolCommException } from '@cool-midway/core';
import { CommentInfoEntity } from '../entity/info';

/**
 * 评论点赞
 */
@Provide()
export class CommentLikeService extends BaseService {
  @InjectEntityModel(CommentLikeEntity)
  commentLikeEntity: Repository<CommentLikeEntity>;

  @InjectEntityModel(CommentInfoEntity)
  commentInfoEntity: Repository<CommentInfoEntity>;

  /**
   * 点赞或取消点赞（基于点赞状态字段）
   * @param userId 用户ID
   * @param commentId 评论ID
   */
  async likeOrUnlike(userId: number, commentId: number) {
    // 查找是否已有该用户对评论的记录
    const like = await this.commentLikeEntity.findOneBy({ userId, commentId });

    if (like) {
      // 如果记录存在，则切换点赞状态
      const newStatus = like.likeStatus === 1 ? 0 : 1;
      await this.commentLikeEntity.update(
        { userId, commentId },
        { likeStatus: newStatus, operateTime: new Date() }
      );
    } else {
      // 如果记录不存在，则插入新记录，状态设为点赞（1）
      await this.commentLikeEntity.insert({
        userId,
        commentId,
        likeStatus: 1,
        operateTime: new Date(),
      });
    }
  }
}
