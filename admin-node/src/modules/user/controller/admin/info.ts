import { CoolController, BaseController } from '@cool-midway/core';
import { UserInfoEntity } from '../../entity/info';

/**
 * 用户信息
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: UserInfoEntity,
  pageQueryOp: {
    fieldEq: [ 'a.gender'],
    keyWordLikeFields: ['a.nickName', 'a.phone'],
  },
})
export class AdminUserInfoController extends BaseController {}
