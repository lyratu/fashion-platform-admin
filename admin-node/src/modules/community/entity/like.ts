import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

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

  @Column({ comment: '状态', dict: ['已赞', '取消'], default: 0 })
  status: number;
}
