import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { CartInfoEntity } from '../../entity/info';
import { CartInfoService } from '../../service/info';
import { UserInfoEntity } from '../../../user/entity/info';
import { BaseSysUserEntity } from '../../../base/entity/sys/user';

/**
 * 购物车
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: CartInfoEntity,
  service: CartInfoService,
  pageQueryOp: {
    fieldEq: ['a.userId', 'a.goodsId', 'a.checked'],
    keyWordLikeFields: [],
    where: async ctx => {
      const { createTimeStart, createTimeEnd } = ctx.request.body;
      const where = [];
      if (createTimeStart) {
        where.push([`a.createTime >= :createTimeStart`, { createTimeStart }]);
      }
      if (createTimeEnd) {
        where.push([`a.createTime <= :createTimeEnd`, { createTimeEnd }]);
      }
      return where;
    },
    join: [
      {
        entity: UserInfoEntity,
        alias: 'b',
        condition: 'a.userId = b.id',
        type: 'leftJoin',
      }
    ],
    select: [
      'a.*',
      'b.nickName as nickName',
      'b.avatarUrl as avatarUrl'
    ],
  },
})
export class AdminCartCartController extends BaseController {
  @Inject()
  cartInfoService: CartInfoService;
  @Inject()
  ctx;
}
