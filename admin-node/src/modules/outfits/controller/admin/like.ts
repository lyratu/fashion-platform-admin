import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { OutfitsLikeEntity } from '../../entity/like';
import { OutfitsLikeService } from '../../service/like';
import { UserInfoEntity } from '../../../user/entity/info';
import { BaseSysUserEntity } from '../../../base/entity/sys/user';

/**
 * 穿搭点赞信息
 */
@CoolController({
  api: ['page', 'info', 'delete', 'update', 'add', 'list'],
  entity: OutfitsLikeEntity,
  service: OutfitsLikeService,
  pageQueryOp: {
    fieldEq: ['a.userId', 'a.outfitsId'],
    keyWordLikeFields: [],
    select: ['a.*', 'b.nickName'],
    join: [
      {
        entity: UserInfoEntity,
        alias: 'b',
        condition: 'a.userId = b.id',
        type: 'leftJoin',
      }
    ],
    where: async ctx => {
      const { startTime, endTime } = ctx.request.body;
      const where: any = [];
      if (startTime && endTime) {
        where.push([
          'a.createTime BETWEEN :startTime AND :endTime',
          { startTime, endTime },
        ]);
      }
      return where;
    },
  },
})
export class AdminOutfitsLikeController extends BaseController {
  @Inject()
  outfitsLikeService: OutfitsLikeService;
}
