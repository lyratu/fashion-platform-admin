import { CoolController, BaseController } from '@cool-midway/core';
import { carouselEntity } from '../../entity/carousel';
import { HomeInfoService } from '../../service/info';

/**
 * 用户-地址
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list'],
  entity: carouselEntity,
  service: HomeInfoService,
})
export class homeController extends BaseController {}
