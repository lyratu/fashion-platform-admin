import { CoolController, BaseController } from '@cool-midway/core';
import { GoodsEntity } from '../../../goods/entity/goods';
import { DemoTenantService } from '../../service/tenant';

/**
 * 多租户
 */
@CoolController({
  api: [],
  entity: GoodsEntity,
  service: DemoTenantService,
})
export class OpenDemoTenantController extends BaseController {}
