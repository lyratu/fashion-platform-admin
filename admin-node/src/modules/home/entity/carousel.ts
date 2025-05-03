import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { OutfitsInfoEntity } from '../../outfits/entity/info';

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

  @Column({ comment: '文章id' })
  outfitsId: string;

  @OneToOne(() => OutfitsInfoEntity, outfit => outfit.carousel, {
    onDelete: 'CASCADE', // 在数据库层面启用级联删除
    orphanedRowAction: 'delete', // 当 child 与 parent 解除关联时，删除 orphan 子记录
  })
  @JoinColumn({ name: 'outfitsId' })
  outfits: OutfitsInfoEntity;
}
