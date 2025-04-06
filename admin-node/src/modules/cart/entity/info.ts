import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { UserInfoEntity } from '../../user/entity/info';
import { GoodsEntity } from '../../goods/entity/goods';

/**
 * 购物车信息
 */
@Entity('cart_info')
export class CartInfoEntity extends BaseEntity {
  @Index()
  @Column({ comment: '用户ID' })
  userId: number;

  @ManyToOne(() => UserInfoEntity)
  @JoinColumn({ name: 'userId' })
  user: UserInfoEntity;

  @Index()
  @Column({ comment: '商品ID' })
  goodsId: number;

  @ManyToOne(() => GoodsEntity)
  @JoinColumn({ name: 'goodsId' })
  goods: GoodsEntity;

  @Column({ comment: '颜色' })
  color: string;

  @Column({ comment: '尺码' })
  size: string;

  @Column({ comment: '数量', type: 'int' })
  count: number;

  @Column({ comment: '选中状态', type: 'tinyint', default: 0 })
  checked: number;
}
