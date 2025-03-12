import { CoolController, BaseController } from '@cool-midway/core';
import { OutFitsEntity } from '../../entity/info';

/**
 * 商品模块-商品信息
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: OutFitsEntity,
})
export class AdminDemoGoodsController extends BaseController {}
