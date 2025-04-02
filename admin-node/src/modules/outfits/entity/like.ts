import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 穿搭点赞
 */
@Entity('outfits_like')
export class OutfitsLikeEntity extends BaseEntity {
  @Index()
  @Column({ comment: '穿搭ID' })
  outfitsId: number;

  @Index()
  @Column({ comment: '用户ID' })
  userId: number;

  @Column({ comment: '点赞状态', dict: ['取消', '点赞'], default: 1 })
  likeStatus: number;

  @Column({ comment: '操作时间', type: 'datetime' })
  operateTime: Date;
}
