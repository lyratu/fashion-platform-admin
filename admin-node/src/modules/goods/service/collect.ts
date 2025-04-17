import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { GoodsCollectEntity } from '../entity/collect';

/**
 * 商品收藏
 */
@Provide()
export class GoodsCollectService extends BaseService {
  @InjectEntityModel(GoodsCollectEntity)
  goodsCollectEntity: Repository<GoodsCollectEntity>;

  @Inject()
  ctx;

  async getCollectRecord(goodsId: number, userId: number) {
    return this.goodsCollectEntity.findOne({ where: { goodsId, userId } });
  }

  async collectOrUnCollect(goodsId: number) {
    let collectStatus = 0;
    const userId = this.ctx.user.id;
    const collectRecord = await this.getCollectRecord(goodsId, userId);
    if (collectRecord) {
      collectRecord.collectStatus = collectRecord.collectStatus === 1 ? 0 : 1;
      collectRecord.operateTime = new Date();
      await this.goodsCollectEntity.save(collectRecord);
      collectStatus = collectRecord.collectStatus;
    } else {
      const newCollectRecord = {
        goodsId,
        userId,
        collectStatus: 1,
        operateTime: new Date(),
      };
      await this.goodsCollectEntity.insert(newCollectRecord);
      collectStatus = 1;
    }
    return { collectStatus };
  }
}
