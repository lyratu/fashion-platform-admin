import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 商品模块-商品信息
 */
@Entity('demo_goods')
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

  @Column({ comment: '相关推荐', type: 'simple-array', nullable: true })
  relatedRecommendations: number[];

  @Column({ comment: '浏览量', default: 0 })
  viewNmber: number;

  @Column({ comment: '状态', dict: ['待审核', '已发布', '已下架'], default: 0 })
  status: number;
}
