import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { UserInfoEntity } from '../../user/entity/info';
/**
 * 评论信息
 */
@Entity('comment_info')
export class CommentInfoEntity extends BaseEntity {
  @Column({ comment: '内容', type: 'text' })
  content: string;

  @Column({ comment: '图片', type: 'json', nullable: true })
  images: string[];

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
  @Column({ comment: '父评ID', nullable: true })
  parentId: number;

  @Index()
  @Column({ comment: '根评ID', nullable: true })
  rootId: number;

  @Column({ comment: '点赞数', default: 0 })
  likeCount: number;

  @Column({ comment: '回复数', default: 0 })
  replyCount: number;

  @Column({
    comment: '类型',
    dict: ['社区评论', '文章评论', '商品评论'],
    default: 0,
  })
  type: number;
}
