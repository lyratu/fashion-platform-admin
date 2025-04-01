import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 标签信息
 */
@Entity('outfits_like')
export class OutfitsLikeEntity extends BaseEntity {
  @Index()
  @Column({ comment: '关联文章id' })
  outfitId: number;

  @Column({ comment: '关联用户id' })
  userId: number;
}
