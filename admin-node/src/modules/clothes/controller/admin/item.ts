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
  pageQueryOp: {
    keyWordLikeFields: ['a.name'],
    fieldEq: ['a.category'],
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
  },
})
export class AdminClothesItemController extends BaseController {
  @Inject()
  clothesItemService: ClothesItemService;
}
