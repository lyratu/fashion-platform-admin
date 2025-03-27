import { GoodsEntity } from '../../../goods/entity/goods';
import { Provide } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { DemoTransactionService } from '../../service/transaction';

/**
 * 事务
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: GoodsEntity,
  service: DemoTransactionService,
})
export class OpenDemoTransactionController extends BaseController {}
