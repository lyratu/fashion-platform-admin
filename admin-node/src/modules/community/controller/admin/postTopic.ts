import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { CommunityPostTopicEntity } from '../../entity/postTopic';
import { CommunityPostTopicService } from '../../service/postTopic';
import { CommunityPostEntity } from '../../entity/post';
import { CommunityTopicEntity } from '../../entity/topic';

/**
 * 内容话题关联
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: CommunityPostTopicEntity,
  service: CommunityPostTopicService,
  pageQueryOp: {
    join: [
      {
        entity: CommunityPostEntity,
        alias: 'b',
        condition: 'a.postId = b.id',
        type: 'leftJoin',
      },
      {
        entity: CommunityTopicEntity,
        alias: 'c',
        condition: 'a.topicId = c.id',
        type: 'leftJoin',
      },
    ],
    select: ['a.*', 'b.content as postContent', 'c.name as topicName'],
  },
})
export class AdminCommunityPostTopicController extends BaseController {
  @Inject()
  communityPostTopicService: CommunityPostTopicService;
}
