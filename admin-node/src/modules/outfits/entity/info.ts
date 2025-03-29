import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { UserInfoEntity } from '../../user/entity/info';

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

  @Column({ comment: '正文', type: 'text', nullable: true })
  content: string;
  @Column({ comment: '分类', dict: 'category', default: 0 })
  category: number;

  @Column({ comment: '是否精选', dict: ['否', '是'], default: 0 })
  isFeature: number;

  @Column({ comment: '浏览量', default: 0 })
  viewNmber: number;

  @Column({ comment: '点赞数', default: 0 })
  likeCount: number;

  @Column({ comment: '收藏数', default: 0 })
  collectCount: number;

  @Index()
  @Column({ comment: '作者ID' })
  authorId: number;

  @ManyToOne(() => UserInfoEntity)
  @JoinColumn({ name: 'authorId' })
  user: UserInfoEntity;
}
