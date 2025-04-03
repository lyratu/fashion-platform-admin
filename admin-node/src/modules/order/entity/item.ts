import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 订单商品
 */
@Entity('order_item')
export class OrderItemEntity extends BaseEntity {
  @Index()
  @Column({ comment: '订单ID' })
  orderId: number;

  @Index()
  @Column({ comment: '商品ID' })
  goodsId: number;

  @Column({ comment: '购买数量' })
  quantity: number;

  @Column({ comment: '商品单价', type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ comment: '商品规格', nullable: true })
  goodsSpecification: string;
}
