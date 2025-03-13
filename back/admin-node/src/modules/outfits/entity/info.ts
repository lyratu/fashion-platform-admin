import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 商品模块-商品信息
 */
@Entity('outfits')
export class OutfitsInfoEntity extends BaseEntity {
  @Column({ comment: '封面图', nullable: true })
  coverImage: string;

  @Index()
  @Column({ comment: '标题', length: 50 })
  title: string;

  @Column({ comment: '描述', nullable: true })
  description: string;

  @Column({ comment: '正文', nullable: true })
  content: string;
  @Column({ comment: '分类', dict: 'category', default: 0 })
  category: number;

  @Column({ comment: '季节', dict: 'season', default: 0 })
  season: number;

  @Column({ comment: '浏览量', default: 0 })
  viewNmber: number;

  @Index()
  @Column({ comment: '作者ID' })
  authorId: number;
}
