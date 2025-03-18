import { CoolController, BaseController } from '@cool-midway/core';
import { homeEntity } from '../../entity/info';
import { HomeInfoService } from '../../service/info';

/**
 * 用户-地址
 */
@CoolController({
  api: ['list'],
  entity: homeEntity,
  service: HomeInfoService,
})
export class appHomeController extends BaseController {}
