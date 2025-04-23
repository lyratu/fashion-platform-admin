import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { ClothesItemEntity } from '../../entity/item';
import { ClothesItemService } from '../../service/item';
import { UserInfoEntity } from '../../../user/entity/info';

/**
 * 衣物信息
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ClothesItemEntity,
  service: ClothesItemService,
  insertParam: ctx => {
    return {
      // 获得当前登录的后台用户ID，需要请求头传Authorization参数
      createUserId: ctx.user.id,
    };
  },
  pageQueryOp: {
    keyWordLikeFields: ['a.name'],
    fieldEq: ['a.category', 'a.status'],
    fieldLike: [
      { column: 'a.season', requestParam: 'season' },
      { column: 'a.color', requestParam: 'color' },
    ],
    join: [
      {
        entity: UserInfoEntity,
        alias: 'b',
        condition: 'a.createUserId = b.id',
        type: 'leftJoin',
      },
    ],
    select: ['a.*', 'b.nickName as createUserName'],
    where: async ctx => {
      return [['a.createUserId = :userId', { userId: ctx.user.id }]];
    },
  },
})
export class ClothesItemController extends BaseController {
  @Inject()
  clothesItemService: ClothesItemService;
}
