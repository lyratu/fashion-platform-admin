import { Get, Inject, Post, Query } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { GoodsCollectEntity } from '../../entity/collect';
import { GoodsCollectService } from '../../service/collect';
import { UserInfoEntity } from '../../../user/entity/info';
import { GoodsEntity } from '../../entity/goods';
import { GoodsService } from '../../service/goods';

/**
 * 商品收藏
 */
@CoolController({
  api: ['page'],
  entity: GoodsCollectEntity,
  service: GoodsCollectService,
  pageQueryOp: {
    where: async ctx => {
      return [['a.userId = :userId', { userId: ctx.user.id }]];
    },
    join: [
      {
        entity: GoodsEntity,
        alias: 'c',
        condition: 'a.goodsId = c.id',
        type: 'leftJoin',
      },
      {
        entity: UserInfoEntity,
        alias: 'b',
        condition: 'a.userId = b.id',
        type: 'leftJoin',
      },
    ],
    select: [
      'a.*',
      'b.nickName as nickName',
      'b.avatarUrl as avatarUrl',
      'c.mainImage as mainImage',
      'c.title as title',
      'c.price as goodsPrice',
    ],
    fieldEq: [{ column: 'c.type', requestParam: 'goodsType' }],
  },
})
export class AppGoodsCollectController extends BaseController {
  @Inject()
  goodsCollectService: GoodsCollectService;

  @Inject()
  goodsService: GoodsService;

  @Inject()
  ctx;

  @Post('/collectOrUncollect', { summary: '收藏或取消收藏' })
  async collectOrUnCollect(@Query('goodsId') goodsId: number) {
    const result = await this.goodsCollectService.collectOrUnCollect(goodsId);
    const collectCount = result.collectStatus
      ? await this.goodsService.incrementCollectCount(goodsId)
      : await this.goodsService.decrementCollectCount(goodsId);
    return this.ok({ collectStatus: result.collectStatus, collectCount });
  }

  @Get('/myCollect')
  async getMyCollect() {
    return this.ok(await this.goodsCollectService.getMyCollect());
  }
}
