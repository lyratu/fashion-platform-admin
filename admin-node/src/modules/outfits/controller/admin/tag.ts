import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { OutfitsTagEntity } from '../../entity/tag';
import { OutfitsTagService } from '../../service/tag';
import { OutfitsInfoEntity } from '../../entity/info';

/**
 * 标签
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: OutfitsTagEntity,
  service: OutfitsTagService,
  pageQueryOp: {
    keyWordLikeFields: ['a.name'],
    fieldEq: ['b.title'],
    join: [
      {
        entity: OutfitsInfoEntity,
        alias: 'b',
        condition: 'a.outfitId = b.id',
        type: 'leftJoin',
      },
    ],
    select:['a.*','b.title']
  },
})
export class AdminOutfitsTagController extends BaseController {
  @Inject()
  outfitsTagService: OutfitsTagService;
}
