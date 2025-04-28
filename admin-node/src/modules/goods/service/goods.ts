import { GoodsEntity } from '../entity/goods';
import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

/**
 * 商品示例
 */
@Provide()
export class GoodsService extends BaseService {
  @InjectEntityModel(GoodsEntity)
  goodsEntity: Repository<GoodsEntity>;

  @Inject()
  ctx;

  /**
   * 执行sql分页
   */
  async sqlPage(query) {
    await this.goodsEntity.save({
      id: 1,
      title: '标题',
      price: 99.0,
      description: '商品描述',
      mainImage: 'https://cool-js.com/logo.png',
    });
    return this.sqlRenderPage(
      'select * from demo_goods ORDER BY id ASC',
      query,
      false
    );
  }

  /**
   * 执行entity分页
   */
  async entityPage(query) {
    const find = this.goodsEntity.createQueryBuilder();
    return this.entityRenderPage(find, query);
  }

  async getGoodsRec() {
    const list = await this.goodsEntity.find({
      order: {
        collectCount: 'DESC',
      },
      take: 5,
    });
    return list;
  }

  /* 更新收藏量 */
  async incrementCollectCount(id: number) {
    await this.goodsEntity.increment({ id }, 'collectCount', 1);
    const updatedComment = await this.goodsEntity.findOne({
      where: { id },
    });
    return updatedComment.collectCount;
  }

  async getInfo(id: number, userId: number) {
    const goods = await this.goodsEntity.findOne({
      relations: ['collects'],
      where: {
        id,
      },
    });
    if (goods && userId) {
      let item = goods.collects.find(collect => collect.userId == userId);
      goods.collectStatus = item?.collectStatus || 0;
    }
    return goods;
  }

  async decrementCollectCount(id: number) {
    await this.goodsEntity.decrement({ id }, 'collectCount', 1);
    const updatedComment = await this.goodsEntity.findOne({
      where: { id },
    });
    return updatedComment.collectCount;
  }
}
