import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 订单信息
 */
@Entity('order_order')
export class OrderOrderEntity extends BaseEntity {
  @Column({ comment: '商品名称', length: 255 })
  goodsName: string;

  @Column({ comment: '价格', type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ comment: '数量', type: 'int' })
  quantity: number;

  @Column({
    comment: '状态',
    dict: ['已下单', '等待发货', '运输中', '已签收'],
    default: 0,
  })
  status: number;

  @Column({ comment: '商品详情', type: 'json', nullable: true })
  goodsDetail: any;

  @Column({ comment: '下单日期', type: 'datetime' })
  orderDate: Date;

  @Index()
  @Column({ comment: '用户ID', nullable: true })
  userId: number;
}
