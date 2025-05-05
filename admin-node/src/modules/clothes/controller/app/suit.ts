import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { ClothesSuitEntity } from '../../entity/suit';
import { ClothesSuitService } from '../../service/suit';
import { Context } from 'vm';
import { UserInfoEntity } from '../../../user/entity/info';

/**
 * 搭配信息
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ClothesSuitEntity,
  service: ClothesSuitService,
  insertParam: async (ctx: Context) => {
    return {
      userId: ctx.user.id,
    };
  },
  pageQueryOp: {
    keyWordLikeFields: ['a.config'],
    join: [
      {
        entity: UserInfoEntity,
        alias: 'b',
        condition: 'a.userId = b.id',
        type: 'leftJoin',
      },
    ],
    select: ['a.*', 'b.nickName', 'b.avatarUrl'],
  },
})
export class ClothesSuitController extends BaseController {
  @Inject()
  clothesSuitService: ClothesSuitService;
}
