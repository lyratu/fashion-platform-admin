import { BaseEntity } from '../../base/entity/base';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserInfoEntity } from '../../user/entity/info';
import { OutfitsTagEntity } from './tag';
import { OutfitsLikeEntity } from './like';
import { OutfitsCollectEntity } from './collect';
import { CommentInfoEntity } from '../../comment/entity/info';
import { DictInfoEntity } from '../../dict/entity/info';

/**
 * 文章模块-文章信息
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

  @Column({ comment: '作者ID' })
  authorId: number;

  @Column({ comment: '点赞数', default: 0 })
  likeCount: number;

  @Column({ comment: '收藏数', default: 0 })
  collectCount: number;

  @Column({ comment: '评论数', default: 0 })
  commentCount: number;

  @ManyToOne(() => UserInfoEntity)
  @JoinColumn({ name: 'authorId' })
  user: UserInfoEntity;

  @OneToMany(() => CommentInfoEntity, comment => comment.outfits, {
    cascade: true,
  })
  comments: CommentInfoEntity[];

  @OneToMany(() => OutfitsTagEntity, tag => tag.outfits, {
    cascade: true,
  })
  tags: OutfitsTagEntity[];

  @OneToMany(() => OutfitsLikeEntity, like => like.outfits, {
    cascade: true,
  })
  likes: OutfitsLikeEntity[];

  @OneToMany(() => OutfitsCollectEntity, collect => collect.outfits, {
    cascade: true,
  })
  collects: OutfitsCollectEntity[];

  likeStatus?: number;
  collectStatus?: number;
}
