import { Get, Inject, Post, Query } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { OutfitsLikeEntity } from '../../entity/like';
import { OutfitsLikeService } from '../../service/like';
import { UserInfoEntity } from '../../../user/entity/info';
import { OutfitsInfoEntity } from '../../../outfits/entity/info';
import { OutfitsInfoService } from '../../service/info';

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
  outfitsInfoService: OutfitsInfoService;

  @Post('/getLikeListByUserId', { summary: '根据用户ID获取点赞列表' })
  async getLikeListByUserId(@Query('userId') userId: number) {
    const result = await this.outfitsLikeService.getLikeListByUserId(userId);
    return this.ok(result);
  }

  @Post('/likeOrUnlike', { summary: '点赞或取消点赞' })
  async likeOrUnlike(@Query('outfitsId') outfitsId: number) {
    const result = await this.outfitsLikeService.likeOrUnlike(outfitsId);
    const likeCount = result.likeStatus
      ? await this.outfitsInfoService.incrementLikeCount(outfitsId)
      : await this.outfitsInfoService.decrementLikeCount(outfitsId);
    return this.ok({ likeStatus: result.likeStatus, likeCount });
  }
}
