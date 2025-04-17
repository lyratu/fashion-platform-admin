import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { GoodsEntity } from './goods';

/**
 * 商品收藏
 */
@Entity('goods_collect')
export class GoodsCollectEntity extends BaseEntity {
  @Index()
  @Column({ comment: '商品ID' })
  goodsId: number;

  @ManyToOne(() => GoodsEntity, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'goodsId' })
  goods: GoodsEntity;

  @Index()
  @Column({ comment: '用户ID' })
  userId: number;

  @Column({ comment: '收藏状态', dict: ['取消', '收藏'], default: 0 })
  collectStatus: number;

  @Column({ comment: '操作时间', type: 'datetime' })
  operateTime: Date;
}
