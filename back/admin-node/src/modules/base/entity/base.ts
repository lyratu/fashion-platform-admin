import { Index, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as moment from 'moment';
import { CoolBaseEntity } from '@cool-midway/core';

const transformer = {
  to(value) {
    return value
      ? moment(value).format('YYYY-MM-DD HH:mm:ss')
      : moment().format('YYYY-MM-DD HH:mm:ss');
  },
  from(value) {
    return value;
  },
};

/**
 * 实体基类
 */
export abstract class BaseEntity extends CoolBaseEntity {
  // 默认自增
  @PrimaryGeneratedColumn('increment', {
    comment: 'ID',
  })
  id: number;

  @Index()
  @Column({
    comment: '创建时间',
    type: 'varchar',
    transformer,
  })
  createTime: Date;

  @Index()
  @Column({
    comment: '更新时间',
    type: 'varchar',
    transformer,
  })
  updateTime: Date;

  @Index()
  @Column({ comment: '租户ID', nullable: true })
  tenantId: number;
}
