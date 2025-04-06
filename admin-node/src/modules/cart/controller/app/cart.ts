import { Inject, Post, Body, Query } from '@midwayjs/core';
import {
  CoolController,
  BaseController,
  CoolTag,
  TagTypes,
} from '@cool-midway/core';
import { CartInfoEntity } from '../../entity/info';
import { CartService } from '../../service/cart';
import { UserInfoEntity } from '../../../user/entity/info';
import { GoodsEntity } from '../../../goods/entity/goods';

/**
 * 购物车
 */
@CoolController({
  api: ['page'],
  entity: CartInfoEntity,
  service: CartService,
  pageQueryOp: {
    fieldEq: ['b.status'],
    join: [
      {
        entity: UserInfoEntity,
        alias: 'b',
        condition: 'a.userId = b.id',
        type: 'leftJoin',
      },
      {
        entity: GoodsEntity,
        alias: 'c',
        condition: 'a.goodsId = c.id',
        type: 'leftJoin',
      },
    ],
    select: [
      'a.*',
      'c.title',
      'c.price',
      'c.color as colors',
      'c.size as sizes',
      'c.mainImage',
    ],
    where: async ctx => {
      return [['a.userId = :userId', { userId: ctx.user.id }]];
    },
  },
})
export class AppCartController extends BaseController {
  @Inject()
  cartService: CartService;
  /**
   * 添加商品到购物车
   * @param goodsId
   * @param goodsNumber
   */

  @Inject()
  ctx;

  @Post('/add', { summary: '添加商品到购物车' })
  async addGoods(
    @Body()
    body: {
      goodsId: number;
      count: number;
      color: string;
      size: string;
    }
  ) {
    const { goodsId, count, color, size } = body;
    await this.cartService.addGoods(
      this.ctx.user.id,
      goodsId,
      count,
      color,
      size
    );
    return this.ok();
  }

  /**
   * 修改商品数量
   * @param id
   * @param goodsNumber
   */
  @Post('/updateNumber', { summary: '修改商品数量' })
  async updateGoodsNumber(
    @Body('id') id: number,
    @Body('goodsNumber') goodsNumber: number
  ) {
    await this.cartService.updateGoodsNumber(id, goodsNumber);
    return this.ok();
  }

  /**
   * 批量修改选中状态
   * @param ids
   * @param checked
   */
  @Post('/updateChecked', { summary: '批量修改选中状态' })
  async updateChecked(
    @Body('ids') ids: number[],
    @Body('checked') checked: number
  ) {
    await this.cartService.updateChecked(ids, checked);
    return this.ok();
  }
}
