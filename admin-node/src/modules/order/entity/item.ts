import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { OrderOrderEntity } from './order';

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
  count: number;

  @Column({ comment: '商品单价', type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ comment: '主图', nullable: true })
  mainImage: string;

  @Index()
  @Column({ comment: '标题', length: 50 })
  title: string;

  @Column({ comment: '商品规格', nullable: true })
  goodsSpecification: string;

  @ManyToOne(() => OrderOrderEntity, order => order.orderItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orderId' })
  order: OrderOrderEntity;
}
