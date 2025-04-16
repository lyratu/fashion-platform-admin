import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 订单信息
 */
@Entity('order_order')
export class OrderOrderEntity extends BaseEntity {
  @Index()
  @Column({ comment: '订单号', length: 50 })
  orderNumber: string;

  @Index()
  @Column({ comment: '用户ID' })
  userId: number;

  @Column({ comment: '总金额', type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({
    comment: '支付状态',
    dict: ['待支付', '已支付', '已发货', '已完成', '已取消'],
    default: 1,
  })
  payStatus: number;

  @Column({ comment: '支付时间', type: 'varchar', nullable: true })
  payTime: Date;

  @Column({ comment: '收货地址', length: 255, nullable: true })
  address: string;

  @Column({ comment: '联系方式', length: 20, nullable: true })
  contactNumber: string;

  @Column({ comment: '物流单号', length: 50, nullable: true })
  trackingNumber: string;
}
