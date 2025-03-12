import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 商品模块-商品信息
 */
@Entity('demo_goods')
export class OutFitsEntity extends BaseEntity {
  @Index()
  @Column({ comment: '标题', length: 50 })
  title: string;

  @Column({ comment: '描述', nullable: true })
  description: string;
}
