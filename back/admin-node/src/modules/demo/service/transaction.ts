import { GoodsEntity } from '../../goods/entity/goods';
import { Provide } from '@midwayjs/core';
import { BaseService, CoolTransaction } from '@cool-midway/core';
import { QueryRunner } from 'typeorm';

/**
 * 操作事务
 */
@Provide()
export class DemoTransactionService extends BaseService {
  /**
   * 事务操作
   */
  @CoolTransaction({
    connectionName: 'default',
  })
  async add(param, queryRunner?: QueryRunner) {
    await queryRunner.manager.insert<GoodsEntity>(GoodsEntity, param);
    return {
      id: param.id,
    };
  }
}
