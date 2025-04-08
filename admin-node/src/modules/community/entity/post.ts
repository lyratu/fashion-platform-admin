import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 社区内容
 */
@Entity('community_post')
export class CommunityPostEntity extends BaseEntity {
  @Column({ comment: '内容', type: 'text' })
  content: string;

  @Column({ comment: '图片', type: 'json', nullable: true })
  images: string[];

  @Column({ comment: '状态', dict: ['启用', '禁用'], default: 0 })
  status: number;

  @Index()
  @Column({ comment: '用户ID' })
  userId: number;
}
