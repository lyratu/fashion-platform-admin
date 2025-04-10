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
import { CommentInfoEntity } from '../../comment/entity/info';
import { CommunityTopicEntity } from './topic';
import { CommunityLikeEntity } from './like';

/**
 * 社区内容
 */
@Entity('community_post')
export class CommunityPostEntity extends BaseEntity {
  @Column({ comment: '内容', type: 'text' })
  content: string;

  @Column({ comment: '图片', type: 'json', nullable: true })
  images: string[];

  @Column({ comment: '点赞数', default: 0 })
  likeCount: number;

  @Column({ comment: '评论数', default: 0 })
  commentCount: number;

  @Index()
  @Column({ comment: '用户ID' })
  userId: number;

  // 关联用户
  @ManyToOne(() => UserInfoEntity)
  @JoinColumn({ name: 'userId' })
  user: UserInfoEntity;

  // 关联评论
  @OneToMany(() => CommentInfoEntity, comment => comment.posts, {
    cascade: true,
  })
  comments: CommentInfoEntity[];

  // 关联点赞
  @OneToMany(() => CommunityLikeEntity, comment => comment.posts, {
    cascade: true,
  })
  likes: CommunityLikeEntity[];

  // 关联话题
  @ManyToMany(() => CommunityTopicEntity, topic => topic.posts, {
    cascade: true,
  })
  @JoinTable()
  topics: CommunityTopicEntity[];

  likeStatus?: number;
}
