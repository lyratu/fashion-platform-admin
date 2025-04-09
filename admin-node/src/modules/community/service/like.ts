import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { CommunityLikeEntity } from '../entity/like';

/**
 * 点赞记录
 */
@Provide()
export class CommunityLikeService extends BaseService {
  @InjectEntityModel(CommunityLikeEntity)
  communityLikeEntity: Repository<CommunityLikeEntity>;

  /**
   * 根据文章id和用户id获取点赞记录
   * @param outfitsId
   * @param userId
   */
  async getLikeRecord(postId: number, userId: number) {
    return this.communityLikeEntity.findOne({ where: { postId, userId } });
  }
}
