import { Inject, Post, Body, Query } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { CartInfoEntity } from '../../entity/info';
import { CartService } from '../../service/cart';
import { UserInfoEntity } from '../../../user/entity/info';

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
        alias: 'c',
        condition: 'a.userId = c.id',
        type: 'leftJoin',
      },
    ],
    where: async ctx => {
      return [['a.userId = :userId', { userId: ctx.user.id }]];
    },
  },
})
export class AppCartController extends BaseController {
  @Inject()
  cartService: CartService;

  @Inject()
  ctx;

  /**
   * 添加商品到购物车
   * @param goodsId
   * @param goodsNumber
   */
  @Post('/add', { summary: '添加商品到购物车' })
  async addGoods(
    @Body('goodsId') goodsId: number,
    @Body('goodsNumber') goodsNumber: number
  ) {
    await this.cartService.addGoods(this.ctx.user.id, goodsId, goodsNumber);
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
