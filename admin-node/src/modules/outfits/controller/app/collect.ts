import { Get, Inject, Post, Query } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { OutfitsCollectEntity } from '../../entity/collect';
import { OutfitsCollectService } from '../../service/collect';
import { UserInfoEntity } from '../../../user/entity/info';
import { OutfitsInfoEntity } from '../../../outfits/entity/info';

/**
 * 穿搭收藏
 */
@CoolController({
  api: [],
  entity: OutfitsCollectEntity,
  service: OutfitsCollectService,
  pageQueryOp: {
    select: ['a.*', 'b.nickName', 'c.title'],
    join: [
      {
        entity: UserInfoEntity,
        alias: 'b',
        condition: 'a.userId = b.id',
        type: 'leftJoin',
      },
      {
        entity: OutfitsInfoEntity,
        alias: 'c',
        condition: 'a.outfitsId = c.id',
        type: 'leftJoin',
      },
    ],
    where: async ctx => {
      const { outfitsId, userId } = ctx.request.body;
      const where = [];
      if (outfitsId) {
        where.push(['a.outfitsId = :outfitsId', { outfitsId }]);
      }
      if (userId) {
        where.push(['a.userId = :userId', { userId }]);
      }
      return where;
    },
  },
})
export class AppOutfitsCollectController extends BaseController {
  @Inject()
  outfitsCollectService: OutfitsCollectService;

  @Inject()
  ctx;

  @Get('/getCollectRecord', { summary: '根据穿搭ID和用户ID获取收藏记录' })
  async getCollectRecord(@Query('outfitsId') outfitsId: number) {
    const result = await this.outfitsCollectService.getCollectRecord(
      outfitsId,
      this.ctx.user.id
    );
    return this.ok(result);
  }

  @Post('/getCollectListByUserId', { summary: '根据用户ID获取收藏列表' })
  async getCollectListByUserId(@Query('userId') userId: number) {
    const result = await this.outfitsCollectService.getCollectListByUserId(
      userId
    );
    return this.ok(result);
  }

  @Post('/getCollectCountByOutfitsId', { summary: '根据穿搭ID统计收藏总数' })
  async getCollectCountByOutfitsId(@Query('outfitsId') outfitsId: number) {
    const result = await this.outfitsCollectService.getCollectCountByOutfitsId(
      outfitsId
    );
    return this.ok(result);
  }

  @Post('/collectOrUncollect', { summary: '收藏或取消收藏' })
  async collectOrUncollect(@Query('outfitsId') outfitsId: number) {
    const userId = this.ctx.user.id;
    const collectRecord = await this.outfitsCollectService.getCollectRecord(
      outfitsId,
      userId
    );
    if (collectRecord) {
      collectRecord.collectStatus = collectRecord.collectStatus === 1 ? 0 : 1;
      collectRecord.operateTime = new Date();
      await this.outfitsCollectService.outfitsCollectEntity.save(collectRecord);
      return this.ok(collectRecord);
    } else {
      const newCollectRecord = {
        outfitsId,
        userId,
        collectStatus: 1,
        operateTime: new Date(),
      };
      await this.outfitsCollectService.outfitsCollectEntity.insert(
        newCollectRecord
      );
      return this.ok(newCollectRecord);
    }
  }
}
