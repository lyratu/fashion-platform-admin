import { CoolController, BaseController } from '@cool-midway/core';
import { GoodsEntity } from '../../entity/goods';
import { GoodsService } from '../../service/goods';
import { Get, Inject } from '@midwayjs/core';

/**
 * 轮播图
 */
@CoolController({
  entity: GoodsEntity,
  service: GoodsService,
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
})
export class appHomeController extends BaseController {
  @Inject()
  homeInfoService: GoodsService;
}
