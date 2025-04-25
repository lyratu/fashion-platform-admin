import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ClothesSuitEntity } from './suit';

/**
 * 衣物信息
 */
@Entity('clothes_item')
export class ClothesItemEntity extends BaseEntity {
  @Column({
    comment: '类别',
    dict: ['上衣', '下装', '鞋子', '包包', '帽子'],
    default: 0,
  })
  category: number;

  @Column({ comment: '图片' })
  picture: string;

  @Index()
  @Column({ comment: '备注', length: 255, nullable: true })
  remark: string;

  @Column({
    comment: '颜色',
    type: 'json',
    nullable: true,
    dict: ['红', '橙', '黄', '绿', '蓝'],
  })
  color: number[];

  @Column({ comment: '状态', dict: ['正常', '闲置', '种草'], default: 0 })
  status: number;

  @Column({
    comment: '季节',
    type: 'json',
    nullable: true,
    dict: ['春', '夏', '秋', '冬'],
  })
  season: number[];

  @Index()
  @Column({ comment: '创建用户' })
  createUserId: number;

}
