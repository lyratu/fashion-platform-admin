import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { CommunityLikeEntity } from '../entity/like';
import { CommunityPostEntity } from '../entity/post';

/**
 * 点赞记录
 */
@Provide()
export class CommunityLikeService extends BaseService {
  @InjectEntityModel(CommunityLikeEntity)
  communityLikeEntity: Repository<CommunityLikeEntity>;

  @InjectEntityModel(CommunityPostEntity)
  communityPostEntity: Repository<CommunityPostEntity>;

  @Inject()
  ctx;

  /**
   * 根据文章id和用户id获取点赞记录
   * @param outfitsId
   * @param userId
   */
  async getLikeRecord(postId: number, userId: number) {
    return this.communityLikeEntity.findOne({ where: { postId, userId } });
  }

  async getUserLikeCount(id: number) {
    const list = await this.communityPostEntity.find({
      relations: ['likes'],
      where: {
        userId: id,
      },
    });
    const total = list.reduce(
      (count, current) =>
        count + current.likes.filter(e => e.likeStatus).length,
      0
    );
    return { count: total };
  }

  async likeOrUnlike(postId: number) {
    let likeStatus = 0;

    const userId = this.ctx.user.id;
    const likeRecord = await this.getLikeRecord(postId, userId);
    if (likeRecord) {
      likeRecord.likeStatus = likeRecord.likeStatus === 1 ? 0 : 1;
      likeRecord.operateTime = new Date();
      await this.communityLikeEntity.save(likeRecord);
      likeStatus = likeRecord.likeStatus;
    } else {
      const newLikeRecord = {
        postId,
        userId,
        likeStatus: 1,
        operateTime: new Date(),
      };
      await this.communityLikeEntity.insert(newLikeRecord);
      likeStatus = 1;
    }
    return { likeStatus };
  }
}
