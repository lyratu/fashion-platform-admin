import { CoolController, BaseController, CoolUrlTag } from '@cool-midway/core';
import { OutfitsInfoEntity } from '../../entity/info';
import { OutfitsInfoService } from '../../service/info';
import { Context } from '@midwayjs/koa';
import { Get, Inject } from '@midwayjs/core';

/**
 * 商品模块-商品信息
 */
@CoolUrlTag()
@CoolController()
export class AppOutfitsInfoController extends BaseController {
  @Inject()
  OutfitsInfoService: OutfitsInfoService;

  @Inject()
  ctx: Context;

  @Get('/getOutfitsList', { summary: '获取穿搭分享文章列表' })
  async getOutfitsList() {
    return this.ok(await this.OutfitsInfoService.list());
  }
}
