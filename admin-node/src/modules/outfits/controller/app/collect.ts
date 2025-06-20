import { Get, Inject, Post, Query } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { OutfitsCollectEntity } from '../../entity/collect';
import { OutfitsCollectService } from '../../service/collect';
import { UserInfoEntity } from '../../../user/entity/info';
import { OutfitsInfoEntity } from '../../../outfits/entity/info';
import { OutfitsInfoService } from '../../service/info';

/**
 * 穿搭收藏
 */
@CoolController({
  api: ['page'],
  entity: OutfitsCollectEntity,
  service: OutfitsCollectService,
  pageQueryOp: {
    select: ['a.*', 'b.nickName', 'c.title', 'c.coverImage'],
    where: async ctx => {
      return [
        ['a.userId = :userId And a.collectStatus=1', { userId: ctx.user.id }],
      ];
    },
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
  },
})
export class AppOutfitsCollectController extends BaseController {
  @Inject()
  outfitsCollectService: OutfitsCollectService;

  @Inject()
  outfitsInfoService: OutfitsInfoService;

  @Post('/getCollectListByUserId', { summary: '根据用户ID获取收藏列表' })
  async getCollectListByUserId(@Query('userId') userId: number) {
    const result = await this.outfitsCollectService.getCollectListByUserId(
      userId
    );
    return this.ok(result);
  }

  @Post('/collectOrUncollect', { summary: '收藏或取消收藏' })
  async collectOrUnCollect(@Query('outfitsId') outfitsId: number) {
    const result = await this.outfitsCollectService.collectOrUnCollect(
      outfitsId
    );
    const collectCount = result.collectStatus
      ? await this.outfitsInfoService.incrementCollectCount(outfitsId)
      : await this.outfitsInfoService.decrementCollectCount(outfitsId);
    return this.ok({ collectStatus: result.collectStatus, collectCount });
  }
}
