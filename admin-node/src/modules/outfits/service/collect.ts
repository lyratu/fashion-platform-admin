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

  @Inject()
  ctx;
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

  async collectOrUnCollect(outfitsId: number) {
    let collectStatus = 0;
    const userId = this.ctx.user.id;
    const collectRecord = await this.getCollectRecord(outfitsId, userId);
    if (collectRecord) {
      collectRecord.collectStatus = collectRecord.collectStatus === 1 ? 0 : 1;
      collectRecord.operateTime = new Date();
      await this.outfitsCollectEntity.save(collectRecord);
      collectStatus = collectRecord.collectStatus;
    } else {
      const newCollectRecord = {
        outfitsId,
        userId,
        collectStatus: 1,
        operateTime: new Date(),
      };
      await this.outfitsCollectEntity.insert(newCollectRecord);
      collectStatus = 1;
    }
    return { collectStatus };
  }
}
