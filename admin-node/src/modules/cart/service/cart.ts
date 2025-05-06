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

  @Inject()
  ctx;
  /**
   * 添加商品到购物车
   * @param userId
   * @param goodsId
   * @param goodsNumber
   */
  async addGoods(goodsId: number, count: number, color: string, size: string) {
    const userId = this.ctx.user.id;
    const cart = await this.cartEntity.findOne({ where: { userId, goodsId } });
    if (cart) {
      cart.count += count;
      await this.cartEntity.save(cart);
    } else {
      await this.cartEntity.insert({ userId, goodsId, count, color, size });
    }
  }

  /**
   *
   * @param id 购物车id
   * @returns 查询商品库存是否充足
   */
  // checkoutStock = (id: number) => {
  //   return new Promise(async (resolve, reject) => {
  //     // 校验库存余量
  //     const cart = await this.cartEntity.findOne({ where: { id } });
  //     const goods = await this.nativeQuery('select * from goods where id = ?', [
  //       cart.goodsId,
  //     ]);
  //     if (goods[0].stock <= cart.count) {
  //       reject('商品库存不足');
  //       throw new CoolCommException('商品库存不足');
  //     } else {
  //       resolve(true);
  //     }
  //   });
  // };

  /**
   * 修改商品数量
   * @param id
   * @param count
   */
  async updateGoodsInfo(
    id: number,
    count?: number,
    size?: string,
    color?: string
  ) {
    // if (await this.checkoutStock(id)) {
    const data = { count, size, color };
    count ? null : delete data.count;
    size ? null : delete data.size;
    color ? null : delete data.color;
    await this.cartEntity.update(id, data);
    // }
  }

  /**
   *
   * @param id 删除购物车商品
   */
  async deleteGoods(id: number) {
    const cart = await this.cartEntity.findOne({ where: { id } });
    return await this.cartEntity.remove(cart);
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

  /**
   *
   * @returns 获取购物车总数
   */
  async getCartCount() {
    const count = await this.cartEntity.find({
      where: {
        userId: this.ctx.user.id,
      },
      select: ['goodsId'],
    });
    // 直接将返回的结果映射为 goodsId 数组
    const goodsIdArray = count.map(item => item.goodsId);
    return goodsIdArray;
  }
}
