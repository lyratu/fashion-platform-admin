import { carouselEntity } from '../../entity/carousel';
import { HomeInfoService } from '../../service/info';
import { Get, Inject } from '@midwayjs/core';
import {
  CoolController,
  BaseController,
  CoolTag,
  TagTypes,
} from '@cool-midway/core';
/**
 * 轮播图
 */

@CoolController({
  entity: carouselEntity,
  service: HomeInfoService,
})
export class appHomeController extends BaseController {
  @Inject()
  homeInfoService: HomeInfoService;

  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Get('/getCarousel', { summary: '获取主页信息' })
  async getCarousel() {
    return this.ok(await this.homeInfoService.getCarousel());
  }
}
