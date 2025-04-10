import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { OutfitsLikeEntity } from '../entity/like';

/**
 * 穿搭点赞
 */
@Provide()
export class OutfitsLikeService extends BaseService {
  @InjectEntityModel(OutfitsLikeEntity)
  outfitsLikeEntity: Repository<OutfitsLikeEntity>;

  /**
   * 根据穿搭ID和用户ID精准匹配操作记录
   * @param outfitsId
   * @param userId
   */
  async getLikeRecord(outfitsId: number, userId: number) {
    return this.outfitsLikeEntity.findOne({ where: { outfitsId, userId } });
  }

  /**
   * 根据用户ID获取点赞列表
   * @param userId
   */
  async getLikeListByUserId(userId: number) {
    return this.outfitsLikeEntity.find({ where: { userId } });
  }
  @Inject()
  ctx;

  /**
   * 根据穿搭ID统计点赞总数
   * @param outfitsId
   */
  async getLikeCountByOutfitsId(outfitsId: number) {
    return this.nativeQuery(
      `
      SELECT COUNT(*) AS total FROM outfits_like WHERE outfitsId = ? AND likeStatus = 1
    `,
      [outfitsId]
    );
  }

  async likeOrUnlike(outfitsId: number) {
    let likeStatus = 0;
    const userId = this.ctx.user.id;
    const likeRecord = await this.getLikeRecord(outfitsId, userId);
    if (likeRecord) {
      likeRecord.likeStatus = likeRecord.likeStatus === 1 ? 0 : 1;
      likeRecord.operateTime = new Date();
      await this.outfitsLikeEntity.save(likeRecord);
      likeStatus = likeRecord.likeStatus;
    } else {
      const newLikeRecord = {
        outfitsId,
        userId,
        likeStatus: 1,
        operateTime: new Date(),
      };
      await this.outfitsLikeEntity.insert(newLikeRecord);
      likeStatus = 1;
    }
    return { likeStatus };
  }
}
