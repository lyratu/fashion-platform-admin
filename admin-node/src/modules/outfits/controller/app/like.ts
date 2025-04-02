import { Inject, Post, Query } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { OutfitsLikeEntity } from '../../entity/like';
import { OutfitsLikeService } from '../../service/like';
import { UserInfoEntity } from '../../../user/entity/info';
import { OutfitsInfoEntity } from '../../../outfits/entity/info';

/**
 * 穿搭点赞
 */
@CoolController({
  api: [],
  entity: OutfitsLikeEntity,
  service: OutfitsLikeService,
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
export class AppOutfitsLikeController extends BaseController {
  @Inject()
  outfitsLikeService: OutfitsLikeService;

  @Inject()
  ctx;

  @Post('/getLikeRecord', { summary: '根据穿搭ID和用户ID获取点赞记录' })
  async getLikeRecord(
    @Query('outfitsId') outfitsId: number,
    @Query('userId') userId: number,
  ) {
    const result = await this.outfitsLikeService.getLikeRecord(
      outfitsId,
      userId,
    );
    return this.ok(result);
  }

  @Post('/getLikeListByUserId', { summary: '根据用户ID获取点赞列表' })
  async getLikeListByUserId(@Query('userId') userId: number) {
    const result = await this.outfitsLikeService.getLikeListByUserId(userId);
    return this.ok(result);
  }
  @Post('/getLikeCountByOutfitsId', { summary: '根据穿搭ID统计点赞总数' })
  async getLikeCountByOutfitsId(@Query('outfitsId') outfitsId: number) {
    const result = await this.outfitsLikeService.getLikeCountByOutfitsId(
      outfitsId,
    );
    return this.ok(result);
  }

  @Post('/likeOrUnlike', { summary: '点赞或取消点赞' })
  async likeOrUnlike(@Query('outfitsId') outfitsId: number) {
    const userId = this.ctx.user.id;
    const likeRecord = await this.outfitsLikeService.getLikeRecord(
      outfitsId,
      userId,
    );
    if (likeRecord) {
      likeRecord.likeStatus = likeRecord.likeStatus === 1 ? 0 : 1;
      likeRecord.operateTime = new Date();
      await this.outfitsLikeService.outfitsLikeEntity.save(likeRecord);
      return this.ok(likeRecord);
    } else {
      const newLikeRecord = {
        outfitsId,
        userId,
        likeStatus: 1,
        operateTime: new Date(),
      };
      await this.outfitsLikeService.outfitsLikeEntity.insert(newLikeRecord);
      return this.ok(newLikeRecord);
    }
  }
}
