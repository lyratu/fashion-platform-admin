import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { GoodsCollectEntity } from './collect';

/**
 * 商品模块-商品信息
 */
@Entity('goods')
export class GoodsEntity extends BaseEntity {
  @Index()
  @Column({ comment: '标题', length: 50 })
  title: string;

  @Column({
    comment: '价格',
    type: 'decimal',
    precision: 5,
    scale: 2,
  })
  price: number;

  @Column({ comment: '描述', nullable: true })
  description: string;

  @Column({ comment: '详情', type: 'text', nullable: true })
  detail: string;

  @Column({ comment: '主图', nullable: true })
  mainImage: string;

  @Column({ comment: '副图', type: 'json', nullable: true })
  subPics: string[];

  @Column({ comment: '分类', dict: 'goodsType' })
  type: number;

  @Column({ comment: '状态', dict: ['禁用', '启用'], default: 1 })
  status: number;

  @Column({ comment: '库存', default: 0 })
  stock: number;

  @Column({
    comment: '颜色',
    type: 'json',
    dict: ['红', '蓝', '绿', '黄', '紫', '橙', '粉', '黑', '白', '灰'],
  })
  color: any[];

  @Column({
    comment: '尺码',
    type: 'json',
    dict: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
  })
  size: any[];

  @Column({ comment: '收藏数', default: 0 })
  collectCount: number;

  @Column({ comment: '销量', default: 0 })
  sales: number;

  @OneToMany(() => GoodsCollectEntity, goods => goods.goods, {
    cascade: true,
  })
  collects: GoodsCollectEntity[];

  collectStatus?: number;
}
