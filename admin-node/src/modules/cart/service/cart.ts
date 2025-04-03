import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { CartInfoEntity } from '../entity/info';
import { CoolCommException } from '@cool-midway/core';

/**
 * 购物车
 */
@Provide()
export class CartService extends BaseService {
  @InjectEntityModel(CartInfoEntity)
  cartEntity: Repository<CartInfoEntity>;

  /**
   * 添加商品到购物车
   * @param userId
   * @param goodsId
   * @param goodsNumber
   */
  async addGoods(userId: number, goodsId: number, count: number) {
    //  校验库存余量
    //  const goods = await this.nativeQuery('select * from goods where id = ?', [goodsId]);
    //  if (goods[0].stock < goodsNumber) {
    //    throw new CoolCommException('商品库存不足');
    //  }

    const cart = await this.cartEntity.findOne({ where: { userId, goodsId } });
    if (cart) {
      cart.count += count;
      await this.cartEntity.save(cart);
    } else {
      await this.cartEntity.insert({ userId, goodsId, count });
    }
  }

  /**
   * 修改商品数量
   * @param id
   * @param goodsNumber
   */
  async updateGoodsNumber(id: number, count: number) {
    //  校验库存余量
    //  const cart = await this.cartEntity.findOne({ where: { id } });
    //  const goods = await this.nativeQuery('select * from goods where id = ?', [cart.goodsId]);
    //  if (goods[0].stock < goodsNumber) {
    //    throw new CoolCommException('商品库存不足');
    //  }

    await this.cartEntity.update(id, { count });
  }

  /**
   * 批量修改选中状态
   * @param ids
   * @param checked
   */
  async updateChecked(ids: number[], checked: number) {
    await this.cartEntity
      .createQueryBuilder()
      .update()
      .set({ checked })
      .whereInIds(ids)
      .execute();
  }
}
