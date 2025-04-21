import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { ClothesItemEntity } from './item';

/**
 * 套装信息
 */
@Entity('suit_suit')
export class ClothesSuitEntity extends BaseEntity {
  @Column({ comment: '穿搭照', nullable: true })
  photo: string;

  @Column({ comment: '适穿温度', type: 'json' })
  temperature: number[];

  @Column({ comment: '季节', type: 'json' })
  season: number[];

  @Column({ comment: '适合场景', nullable: true })
  scene: string;

  @Column({ comment: '风格', nullable: true })
  style: string;

  @Column({ comment: '搭配标签', type: 'json', nullable: true })
  tags: string[];

  @Column({ comment: '备注', nullable: true })
  remark: string;

  @Column({ comment: '配置', type: 'json' })
  config: string;

  @OneToMany(() => ClothesItemEntity, item => item.suit, {
    cascade: true,
  })
  clothes: ClothesItemEntity[];
}
