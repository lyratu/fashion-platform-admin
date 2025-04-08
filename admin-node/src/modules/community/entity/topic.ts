import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 社区话题
 */
@Entity('community_topic')
export class CommunityTopicEntity extends BaseEntity {
  @Column({ comment: '名称' })
  name: string;

  @Column({ comment: '状态', dict: ['显示', '隐藏'], default: 0 })
  status: number;
}
