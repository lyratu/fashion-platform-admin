import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { OutfitsInfoEntity } from './info';

/**
 * 穿搭收藏
 */
@Entity('outfits_collect')
export class OutfitsCollectEntity extends BaseEntity {
  @Index()
  @Column({ comment: '穿搭ID' })
  outfitsId: number;

  @ManyToOne(() => OutfitsInfoEntity, {
      onDelete: "CASCADE", orphanedRowAction: 'delete'
  })
  @JoinColumn({ name: 'outfitsId' })
  outfits: OutfitsInfoEntity;

  @Index()
  @Column({ comment: '用户ID' })
  userId: number;

  @Column({ comment: '收藏状态', dict: ['取消', '收藏'], default: 0 })
  collectStatus: number;

  @Column({ comment: '操作时间', type: 'datetime' })
  operateTime: Date;
}
