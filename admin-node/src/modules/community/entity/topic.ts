import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index, ManyToMany, ManyToOne } from 'typeorm';
import { CommentInfoEntity } from '../../comment/entity/info';
import { CommunityPostEntity } from './post';

/**
 * 社区话题
 */
@Entity('community_topic')
export class CommunityTopicEntity extends BaseEntity {
  @Column({ comment: '名称', unique: true })
  name: string;

  // 关联社区
  @ManyToMany(() => CommunityPostEntity, post => post.topics)
  posts: CommunityPostEntity[];

  @Column({ comment: '状态', dict: ['显示', '隐藏'], default: 0 })
  status: number;
}
