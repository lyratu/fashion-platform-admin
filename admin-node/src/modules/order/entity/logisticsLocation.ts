import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 物流位置记录
 */
@Entity('order_logistics_location')
export class OrderLogisticsLocationEntity extends BaseEntity {
  @Index()
  @Column({ comment: '物流ID' })
  logisticsId: number;

  // @Column({ comment: '位置坐标', type: 'json' })
  // locationCoordinate: {
  //   longitude: number;
  //   latitude: number;
  // };

  @Column({ comment: '状态', dict: ["正常","已签收","异常"] })
  status: number;

  @Column({ comment: '详细地址' })
  detailedAddress: string;

  @Column({ comment: '记录时间', type: 'datetime' })
  recordTime: Date;

  @Column({ comment: '位置描述', nullable: true })
  locationDescription: string;
}
