import { CoolController, BaseController } from '@cool-midway/core';
import { homeEntity } from '../../entity/info';
import { HomeInfoService } from '../../service/info';

/**
 * 用户-地址
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list'],
  entity: homeEntity,
  service: HomeInfoService,
})
export class homeController extends BaseController {}
