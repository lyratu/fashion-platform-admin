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

  @Index()
  @Column({ comment: '用户ID' })
  userId: number;

  @ManyToOne(() => UserInfoEntity)
  @JoinColumn({ name: 'userId' })
  user: UserInfoEntity;

  @Index()
  @Column({ comment: '对象ID' })
  objectId: number;

  @Index()
  @TreeParent()
  @Column({ comment: '父评ID', nullable: true })
  parentId: number;

  @Index()
  @Column({ comment: '根评ID', nullable: true })
  rootId: number;

  @OneToMany(() => commentLikeEntity, like => like.comments, {
    cascade: true,
  })
  likes: commentLikeEntity[];

  @Column({ comment: '点赞数', default: 0 })
  likeCount: number;

  @Column({ comment: '回复数', default: 0 })
  replyCount: number;

  @ManyToOne(() => OutfitsInfoEntity, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'outfitsId' })
  outfits: OutfitsInfoEntity;

  @TreeChildren()
  children: CommentInfoEntity[];

  @Column({
    comment: '类型',
    dict: ['社区评论', '文章评论', '商品评论'],
    default: 0,
  })
  type: number;
}
