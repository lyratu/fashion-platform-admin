import { CoolController, BaseController } from '@cool-midway/core';
import { carouselEntity } from '../../entity/carousel';
import { HomeInfoService } from '../../service/info';
import { Get, Inject } from '@midwayjs/core';

/**
 * 用户-地址
 */
@CoolController({
  entity: carouselEntity,
  service: HomeInfoService,
})
export class appHomeController extends BaseController {
  @Inject()
  homeInfoService: HomeInfoService;

  @Get('/getCarousel', { summary: '获取主页信息' })
  async getCarousel() {
    return this.ok(await this.homeInfoService.getCarousel());
  }
}
