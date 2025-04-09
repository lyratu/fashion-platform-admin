import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CommunityPostEntity } from './post';

/**
 * 点赞记录
 */
@Entity('community_like')
export class CommunityLikeEntity extends BaseEntity {
  @Index()
  @Column({ comment: '用户ID' })
  userId: number;

  @Index()
  @Column({ comment: '内容ID' })
  postId: number;

  @ManyToOne(() => CommunityPostEntity, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'postId' })
  posts: CommunityPostEntity;

  @Column({ comment: '状态', dict: ['已赞', '取消'], default: 0 })
  likeStatus: number;

  @Column({ comment: '操作时间', type: 'datetime' })
  operateTime: Date;
}
