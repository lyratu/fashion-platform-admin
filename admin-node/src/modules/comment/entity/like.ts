import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CommentInfoEntity } from './info';

/**
 * 穿搭点赞
 */
@Entity('comment_like')
export class CommentLikeEntity extends BaseEntity {
  @Index()
  @Column({ comment: '评论ID' })
  commentId: number;

  @ManyToOne(() => CommentInfoEntity, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'commentId' })
  comments: CommentInfoEntity;

  @Index()
  @Column({ comment: '用户ID' })
  userId: number;

  @Column({ comment: '点赞状态', dict: ['取消', '点赞'], default: 0 })
  likeStatus: number;

  @Column({ comment: '操作时间', type: 'datetime' })
  operateTime: Date;
}
