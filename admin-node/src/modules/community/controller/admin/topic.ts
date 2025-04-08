import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { CommunityTopicEntity } from '../../entity/topic';
import { CommunityTopicService } from '../../service/topic';

/**
 * 社区话题
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: CommunityTopicEntity,
  service: CommunityTopicService,
  pageQueryOp: {
    keyWordLikeFields: ['a.name'],
    fieldEq: ['a.status'],
  },
})
export class AdminCommunityTopicController extends BaseController {
  @Inject()
  communityTopicService: CommunityTopicService;
}
