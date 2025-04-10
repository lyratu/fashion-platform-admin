import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { CommunityPostEntity } from '../entity/post';
import { UserInfoEntity } from '../../user/entity/info';
import { CommentInfoEntity } from '../../comment/entity/info';

/**
 * 社区内容
 */
@Provide()
export class AppCommunityPostService extends BaseService {
  @InjectEntityModel(CommunityPostEntity)
  communityPostEntity: Repository<CommunityPostEntity>;

  @Inject()
  ctx;

  async info(id: any, infoIgnoreProperty?: string[]): Promise<any> {
    const result = await this.communityPostEntity
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.user', 'user')
      .leftJoinAndSelect('p.topics', 'topic')
      .leftJoinAndSelect('p.likes', 'like', 'like.userId = :currentUserId', {
        currentUserId: this.ctx.user.id,
      })
      .select([
        'p',
        'like.likeStatus',
        'user.nickName',
        'user.id',
        'user.avatarUrl',
        'topic.id',
        'topic.name',
      ])
      .where('p.id = :id', { id })
      .getOne();
    result.likeStatus = result.likes[0].likeStatus;
    delete result.likes;
    return result;
  }

  async add(param: any) {
    param.userId = this.ctx.user.id;
    const result = await super.add(param);
    return result;
  }

  /* 更新喜欢数 */
  async incrementLikeCount(postId: number) {
    await this.communityPostEntity.increment({ id: postId }, 'likeCount', 1);
    const updatedComment = await this.communityPostEntity.findOne({
      where: { id: postId },
    });
    return updatedComment.likeCount;
  }

  async decrementLikeCount(postId: number) {
    await this.communityPostEntity.decrement({ id: postId }, 'likeCount', 1);
    const updatedComment = await this.communityPostEntity.findOne({
      where: { id: postId },
    });
    return updatedComment.likeCount;
  }

  /* 更新评论数 */
  async incrementCommentCount(postId: number) {
    await this.communityPostEntity.increment({ id: postId }, 'commentCount', 1);
    const updatedComment = await this.communityPostEntity.findOne({
      where: { id: postId },
    });
    return updatedComment.commentCount;
  }

  async decrementCommentCount(postId: number) {
    await this.communityPostEntity.decrement({ id: postId }, 'commentCount', 1);
    const updatedComment = await this.communityPostEntity.findOne({
      where: { id: postId },
    });
    return updatedComment.commentCount;
  }

  async queryActiveUsersFromPosts(): Promise<any[]> {
    // 假设已正确引入 CommunityPostEntity、CommentEntity 和 UserEntity
    const activeUsers = await this.communityPostEntity
      .createQueryBuilder('p')
      // 关联评论表
      .leftJoin(CommentInfoEntity, 'c', 'c.userId = p.userId')
      // 关联用户详情表
      .leftJoin(UserInfoEntity, 'u', 'u.id = p.userId')
      // 选择需要的字段以及聚合计算
      .select('p.userId', 'userId')
      .addSelect('COUNT(DISTINCT p.id)', 'postCount')
      .addSelect('COUNT(DISTINCT c.id)', 'commentCount')
      .addSelect('COUNT(DISTINCT p.id) + COUNT(DISTINCT c.id)', 'activityCount')
      // 利用 MySQL 的 JSON_OBJECT 函数构造 user 对象
      .addSelect(
        "JSON_OBJECT('id', u.id, 'nickName', u.nickName, 'avatarUrl', u.avatarUrl,'position',u.position)",
        'user'
      )
      .groupBy('p.userId, u.id')
      .orderBy('activityCount', 'DESC')
      .limit(3)
      .getRawMany();
    return activeUsers;
  }
}
