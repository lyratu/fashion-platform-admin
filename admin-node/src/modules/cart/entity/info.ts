import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 购物车信息
 */
@Entity('cart_info')
export class CartInfoEntity extends BaseEntity {
  @Index()
  @Column({ comment: '用户ID' })
  userId: number;

  @Index()
  @Column({ comment: '商品ID' })
  goodsId: number;

  @Column({ comment: '数量', type: 'int' })
  count: number;

  @Column({ comment: '选中状态', type: 'tinyint', default: 0 })
  checked: number;
}
