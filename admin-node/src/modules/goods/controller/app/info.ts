import { GoodsEntity } from '../../entity/goods';
import { GoodsService } from '../../service/goods';
import { Get, Inject, Query } from '@midwayjs/core';
import {
  CoolController,
  BaseController,
  CoolTag,
  TagTypes,
  CoolUrlTag,
} from '@cool-midway/core';
import { UserInfoEntity } from '../../../user/entity/info';
/**
 * 商城
 */

@CoolUrlTag({
  key: TagTypes.IGNORE_TOKEN,
  value: ['page', 'info'],
})
@CoolController({
  entity: GoodsEntity,
  service: GoodsService,
  api: ['page', 'info'],
  pageQueryOp: {
    keyWordLikeFields: ['a.description'],
    fieldEq: ['a.status'],
    fieldLike: ['a.title', 'a.type'],
  },
})
export class goodsController extends BaseController {
  @Inject()
  goodsService: GoodsService;

  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Get('/getGoodsRec', { summary: '获取精选商品' })
  async getGoodsRec() {
    return this.ok(await this.goodsService.getGoodsRec());
  }

  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Get('/getInfo', { summary: '获取商品详情' })
  async getInfo(@Query() params: { id: number; userId: number }) {
    const { id, userId } = params;
    return this.ok(await this.goodsService.getInfo(id, userId));
  }
}
