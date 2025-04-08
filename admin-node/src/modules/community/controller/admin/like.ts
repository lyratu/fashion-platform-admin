import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { CommunityLikeEntity } from '../../entity/like';
import { CommunityLikeService } from '../../service/like';

/**
 * 点赞记录
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: CommunityLikeEntity,
  service: CommunityLikeService,
  pageQueryOp: {
    fieldEq: ['a.userId', 'a.status'],
  },
})
export class AdminCommunityLikeController extends BaseController {
  @Inject()
  communityLikeService: CommunityLikeService;
}
