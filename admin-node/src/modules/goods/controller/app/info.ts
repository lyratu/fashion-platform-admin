import { GoodsEntity } from '../../entity/goods';
import { GoodsService } from '../../service/goods';
import { Get, Inject } from '@midwayjs/core';
import {
  CoolController,
  BaseController,
  CoolTag,
  TagTypes,
  CoolUrlTag,
} from '@cool-midway/core';
/**
 * 轮播图
 */

@CoolUrlTag({
  key: TagTypes.IGNORE_TOKEN,
  value: ['page'],
})
@CoolController({
  entity: GoodsEntity,
  service: GoodsService,
  api: ['page'],
})
export class goodsController extends BaseController {
  @Inject()
  goodsService: GoodsService;

  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Get('/getGoodsRec', { summary: '获取穿搭分享精选' })
  async getGoodsRec() {
    return this.ok(await this.goodsService.getGoodsRec());
  }
}
