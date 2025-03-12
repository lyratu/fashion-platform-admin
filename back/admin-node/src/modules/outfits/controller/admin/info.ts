import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { OutfitsInfoEntity } from '../../entity/info';
import { OutfitsInfoService } from '../../service/info';

/**
 * 穿搭信息
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: OutfitsInfoEntity,
  service: OutfitsInfoService,
  pageQueryOp: {
    keyWordLikeFields: ['a.title'],
    fieldEq: ['a.status'],
    where: async ctx => {
      const { popularityStart, popularityEnd } = ctx.request.body;
      const where = [];
      if (popularityStart !== undefined) {
        where.push(['a.popularity >= :popularityStart', { popularityStart }]);
      }
      if (popularityEnd !== undefined) {
        where.push(['a.popularity <= :popularityEnd', { popularityEnd }]);
      }
      return where;
    },
    join: [
      {
        entity: OutfitsInfoEntity,
        alias: 'b',
        condition: 'FIND_IN_SET(b.id, a.relatedRecommendations)',
        type: 'leftJoin',
      },
    ],
    select: [
      'a.*',
    ],
  },
})
export class AdminOutfitsInfoController extends BaseController {
  @Inject()
  outfitsInfoService: OutfitsInfoService;
}
