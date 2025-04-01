import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { OutfitsInfoEntity } from './info';

/**
 * 标签信息
 */
@Entity('outfits_tag')
export class OutfitsTagEntity extends BaseEntity {
  @Index()
  @Column({ comment: '名称', length: 255 })
  name: string;

  @Index()
  @Column({ comment: '关联outfitId', nullable: true })
  outfitId: number;

  @ManyToOne(() => OutfitsInfoEntity)
  @JoinColumn({ name: 'outfitId' })
  outfits: OutfitsInfoEntity;
}
