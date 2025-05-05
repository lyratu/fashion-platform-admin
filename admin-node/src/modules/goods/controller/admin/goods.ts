import { CoolController, BaseController } from '@cool-midway/core';
import { GoodsEntity } from '../../entity/goods';
import { UserInfoEntity } from '../../../user/entity/info';
import { GoodsService } from '../../service/goods';

/**
 * 商品模块-商品信息
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: GoodsEntity,
  service: GoodsService,
  pageQueryOp: {
    keyWordLikeFields: [''],
    fieldEq: [''],
    fieldLike: ['a.title'],
    select: ['a.*', 'b.nickName as userName'],
    join: [
      {
        entity: UserInfoEntity,
        alias: 'b',
        condition: 'a.id = b.id',
      },
    ],
  },
})
export class AdminGoodsController extends BaseController {}
