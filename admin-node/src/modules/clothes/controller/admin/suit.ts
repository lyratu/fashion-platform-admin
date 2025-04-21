import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { ClothesSuitEntity } from '../../entity/suit';
import { ClothesSuitService } from '../../service/suit';

/**
 * 搭配信息
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ClothesSuitEntity,
  service: ClothesSuitService,
  pageQueryOp: {
    keyWordLikeFields: ['a.config'],
  },
})
export class AdminClothesSuitController extends BaseController {
  @Inject()
  clothesSuitService: ClothesSuitService;
}
