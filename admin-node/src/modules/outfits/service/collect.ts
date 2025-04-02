import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { OutfitsCollectEntity } from '../entity/collect';

/**
 * 穿搭收藏
 */
@Provide()
export class OutfitsCollectService extends BaseService {
  @InjectEntityModel(OutfitsCollectEntity)
  outfitsCollectEntity: Repository<OutfitsCollectEntity>;

  /**
   * 根据穿搭ID和用户ID精准匹配操作记录
   * @param outfitsId
   * @param userId
   */
  async getCollectRecord(outfitsId: number, userId: number) {
    return this.outfitsCollectEntity.findOne({ where: { outfitsId, userId } });
  }

  /**
   * 根据用户ID获取收藏列表
   * @param userId
   */
  async getCollectListByUserId(userId: number) {
    return this.outfitsCollectEntity.find({ where: { userId } });
  }

  /**
   * 根据穿搭ID统计收藏总数
   * @param outfitsId
   */
  async getCollectCountByOutfitsId(outfitsId: number) {
    return this.nativeQuery(
      `
      SELECT COUNT(*) AS total FROM outfits_collect WHERE outfitsId = ? AND collectStatus = 1
    `,
      [outfitsId],
    );
  }
}
