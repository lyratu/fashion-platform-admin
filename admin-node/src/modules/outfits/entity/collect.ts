import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 穿搭收藏
 */
@Entity('outfits_collect')
export class OutfitsCollectEntity extends BaseEntity {
  @Index()
  @Column({ comment: '穿搭ID' })
  outfitsId: number;

  @Index()
  @Column({ comment: '用户ID' })
  userId: number;

  @Column({ comment: '收藏状态', dict: ['取消', '收藏'], default: 1 })
  collectStatus: number;

  @Column({ comment: '操作时间', type: 'datetime' })
  operateTime: Date;
}
