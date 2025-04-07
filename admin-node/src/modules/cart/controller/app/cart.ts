import { Inject, Post, Body, Query, Get } from '@midwayjs/core';
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
    await this.cartService.addGoods(goodsId, count, color, size);
    return this.ok();
  }

  /**
   * 获取购物车总数
   */

  @Get('/getCartCount', { summary: '获取购物车总数' })
  async getCartCount() {
    return this.ok(await this.cartService.getCartCount());
  }

  /**
   * 修改商品数量
   * @param id
   * @param goodsNumber
   */
  @Post('/updateGoodsInfo', { summary: '修改商品信息' })
  async updateGoodsInfo(
    @Body()
    body: {
      id: number;
      count?: number;
      size?: string;
      color?: string;
    }
  ) {
    const { id, count, size, color } = body;
    await this.cartService.updateGoodsInfo(id, count, size, color);
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

  @Post('/deleteGoods', { summary: '删除购物车商品' })
  async deleteGoods(@Query('id') id: number) {
    return this.ok(await this.cartService.deleteGoods(id));
  }
}
