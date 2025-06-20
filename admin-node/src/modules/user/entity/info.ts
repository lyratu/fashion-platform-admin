import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 用户信息
 */
@Entity('user_info')
export class UserInfoEntity extends BaseEntity {
  @Index({ unique: true })
  @Column({ comment: '登录唯一ID', nullable: true })
  unionid: string;

  @Column({ comment: '头像', nullable: true })
  avatarUrl: string;

  @Column({ comment: '昵称', nullable: true })
  nickName: string;

  @Index({ unique: true })
  @Column({ comment: '手机号', nullable: true })
  phone: string;

  @Column({ comment: '性别', dict: ['男', '女'], default: 0 })
  gender: number;

  @Column({ comment: '身份', dict: ['普通', '达人'], default: 0 })
  type: number;

  @Column({ comment: '职业', nullable: true })
  position: string;

  @Column({ comment: '状态', dict: ['禁用', '正常', '已注销'], default: 1 })
  status: number;

  @Column({ comment: '登录方式', dict: ['小程序', '公众号', 'H5'], default: 0 })
  loginType: number;

  @Column({ comment: '密码', nullable: true })
  password: string;

  @Column({ comment: '介绍', type: 'varchar', nullable: true, length: '80' })
  description: string;
}
