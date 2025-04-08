import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { CommentInfoEntity } from '../../comment/entity/info';

/**
 * 社区话题
 */
@Entity('community_topic')
export class CommunityTopicEntity extends BaseEntity {
  @Column({ comment: '名称' })
  name: string;

  // 关联社区
  @ManyToOne(() => CommentInfoEntity, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  posts: CommentInfoEntity;

  @Column({ comment: '状态', dict: ['显示', '隐藏'], default: 0 })
  status: number;
}
