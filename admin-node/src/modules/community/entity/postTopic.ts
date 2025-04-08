import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 内容话题关联
 */
@Entity('community_post_topic')
export class CommunityPostTopicEntity extends BaseEntity {
  @Index()
  @Column({ comment: '内容ID' })
  postId: number;

  @Index()
  @Column({ comment: '话题ID' })
  topicId: number;
}
