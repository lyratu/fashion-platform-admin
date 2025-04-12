import { Get, Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { CommunityTopicEntity } from '../../entity/topic';
import { CommunityTopicService } from '../../service/topic';

/**
 * 社区话题
 */
@CoolController({
  api: ['page'],
  entity: CommunityTopicEntity,
  service: CommunityTopicService,
  pageQueryOp: {
    keyWordLikeFields: ['a.name'],
    fieldEq: ['a.status'],
  },
})
export class AppCommunityTopicController extends BaseController {
  @Inject()
  communityTopicService: CommunityTopicService;

  @Get('/trend', { summary: '获取流行话题趋势' })
  async getTrend() {
    return this.ok(await this.communityTopicService.getTrendingTopics());
  }
}
