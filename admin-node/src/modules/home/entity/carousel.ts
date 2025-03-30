import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 轮播图模块
 */
@Entity('home_config')
export class carouselEntity extends BaseEntity {
  @Index()
  @Column({ comment: '标题', length: 50 })
  title: string;

  @Column({ comment: '轮播图', nullable: true })
  CarouselImg: string;

  @Column({ comment: '描述', nullable: true })
  description: string;

  @Column({ comment: '文章id', nullable: true })
  outfitsId: string;
}
