import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { CommunityPostEntity } from '../../entity/post';
import { UserInfoEntity } from '../../../user/entity/info';
import { AppCommunityPostService } from '../../service/app_post';
import { CommunityTopicEntity } from '../../entity/topic';
import { SelectQueryBuilder } from 'typeorm';

/**
 * 社区内容
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: CommunityPostEntity,
  service: AppCommunityPostService,
  pageQueryOp: {
    keyWordLikeFields: ['a.content'],
    fieldEq: ['a.status', 'a.userId'],
    join: [
      {
        entity: UserInfoEntity,
        alias: 'b',
        condition: 'a.userId = b.id',
        type: 'leftJoin',
      },
      {
        entity: 'community_post_topics_community_topic',
        alias: 'c',
        condition: 'a.id = c.communityPostId',
        type: 'leftJoin',
      },
      {
        entity: CommunityTopicEntity,
        alias: 'd',
        condition: 'd.id = c.communityTopicId',
        type: 'leftJoin',
      },
    ],
    select: [
      'a.*',
      "IF(COUNT(d.id)=0, NULL, JSON_ARRAYAGG(JSON_OBJECT('name', d.name, 'id', d.id))) as topics",
      "JSON_OBJECT('nickName', b.nickName, 'avatarUrl', b.avatarUrl,'id', b.id,'position', b.position) as user",
    ],
    extend: async (find: SelectQueryBuilder<CommunityPostEntity>) => {
      find.groupBy('a.id');
    },
  },
})
export class CommunityPostController extends BaseController {
  @Inject()
  appCommunityPostService: AppCommunityPostService;
}
