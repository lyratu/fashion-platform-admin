import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { OutfitsTagEntity } from '../../entity/tag';
import { OutfitsTagService } from '../../service/tag';

/**
 * 标签
 */
@CoolController({
  api: ['add', 'delete', 'info', 'list', 'page'],
  entity: OutfitsTagEntity,
  service: OutfitsTagService,
  pageQueryOp: {
    keyWordLikeFields: ['a.name'],
    fieldEq: ['a.outfitId'],
  },
})
export class AdminOutfitsTagController extends BaseController {
  @Inject()
  outfitsTagService: OutfitsTagService;
}
