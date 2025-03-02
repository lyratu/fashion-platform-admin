import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 商品评价
 */
@Entity('order_evaluate')
export class OrderEvaluateEntity extends BaseEntity {
  @Index()
  @Column({ comment: '用户ID', nullable: true })
  userId: number;

  @Column({ comment: '评价内容', type: 'text' })
  content: string;

  @Column({ comment: '评价图片', type: 'json', nullable: true })
  images: string[];

  @Column({ comment: '评价时间', type: 'datetime' })
  evaluateTime: Date;

  @Column({ comment: '点赞数量', default: 0 })
  likeCount: number;

  @Column({ comment: '收藏数量', default: 0 })
  collectCount: number;

  @Index()
  @Column({ comment: '订单ID', nullable: true })
  orderId: number;
}
