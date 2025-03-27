import { CoolController, BaseController } from '@cool-midway/core';
import { GoodsEntity } from '../../../goods/entity/goods';
import { DemoTenantService } from '../../service/tenant';

/**
 * 多租户
 */
@CoolController({
  serviceApis: [
    'use',
    {
      method: 'noUse',
      summary: '不使用多租户',
    },
    {
      method: 'noTenant',
      summary: '局部不使用多租户',
    },
  ],
  entity: GoodsEntity,
  service: DemoTenantService,
})
export class AdminDemoTenantController extends BaseController {}
