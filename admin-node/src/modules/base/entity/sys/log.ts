import { BaseEntity } from '../base';
import { Column, Index, Entity } from 'typeorm';

/**
 * 系统日志
 */
@Entity('base_sys_log')
export class BaseSysLogEntity extends BaseEntity {
  @Index()
  @Column({ comment: '用户ID', nullable: true })
  userId: number;

  @Index()
  @Column({ comment: '行为' })
  action: string;

  @Index()
  @Column({ comment: 'ip', nullable: true })
  ip: string;

  @Column({ comment: '参数', nullable: true, type: 'json' })
  params: string;
}
