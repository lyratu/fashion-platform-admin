import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 物流信息
 */
@Entity('order_logistics')
export class OrderLogisticsEntity extends BaseEntity {
  @Index()
  @Column({ comment: '订单ID' })
  orderId: number;

  @Column({ comment: '物流公司', length: 50 })
  logisticsCompany: string;

  @Column({ comment: '物流单号', length: 50 })
  logisticsNumber: string;

  @Column({
    comment: '物流状态',
    dict: ['运输中', '已签收', '异常'],
    default: 0,
  })
  logisticsStatus: number;

  @Column({ comment: '联系人', length: 50 })
  contactPerson: string;

  @Column({ comment: '联系电话', length: 20 })
  contactPhone: string;

  @Column({ comment: '收货地址' })
  receivingAddress: string;
}
