import { BaseEntity } from '../../base/entity/base';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { UserInfoEntity } from '../../user/entity/info';
import { commentLikeEntity } from './like';
import { OutfitsInfoEntity } from '../../outfits/entity/info';
/**
 * 评论信息
 */
@Entity('comment_info')
export class CommentInfoEntity extends BaseEntity {
  @Column({ comment: '内容', type: 'text' })
  content: string;

  // 关联评论用户
  @Index()
  @Column({ comment: '用户ID' })
  userId: number;

  // 关联评论用户
  @ManyToOne(() => UserInfoEntity)
  @JoinColumn({ name: 'userId' })
  user: UserInfoEntity;

  // 回复用户
  @Column({ comment: '回复到用户名称', nullable: true })
  replyTo: string;

  // 文章/商品/社区ID
  @Index()
  @Column({ comment: '对象ID' })
  objectId: number;

  // 父亲评论
  @Index()
  @ManyToOne(() => CommentInfoEntity, comment => comment.children, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parent: CommentInfoEntity;

  // 子评论
  @OneToMany(() => CommentInfoEntity, comment => comment.parent)
  children: CommentInfoEntity[];

  // 关联点赞
  @OneToMany(() => commentLikeEntity, like => like.comments, {
    cascade: true,
  })
  likes: commentLikeEntity[];

  @Column({ comment: '点赞数', default: 0 })
  likeCount: number;

  @Column({ comment: '回复数', default: 0 })
  replyCount: number;

  // 关联文章
  @ManyToOne(() => OutfitsInfoEntity, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  outfits: OutfitsInfoEntity;

  @Column({
    comment: '类型',
    dict: ['社区评论', '文章评论', '商品评论'],
    default: 0,
  })
  type: number;
}
