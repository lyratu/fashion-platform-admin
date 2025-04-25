import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ClothesItemEntity } from './item';
import { UserInfoEntity } from '../../user/entity/info';

/**
 * 套装信息
 */
@Entity('clothes_suit')
export class ClothesSuitEntity extends BaseEntity {
  @Column({ comment: '穿搭照', nullable: true })
  photo: string;

  @Column({ comment: '适穿温度', type: 'json', nullable: true })
  temperature: number[];

  @Column({ comment: '季节', type: 'json', nullable: true })
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

  @Column({ comment: '关联用户id' })
  userId: number;

    // 关联用户
    @ManyToOne(() => UserInfoEntity)
    @JoinColumn({ name: 'userId' })
    user: UserInfoEntity;

}
