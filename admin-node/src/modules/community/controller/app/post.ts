import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { CommunityPostEntity } from '../../entity/post';
import { UserInfoEntity } from '../../../user/entity/info';
import { AppCommunityPostService } from '../../service/app_post';

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
    ],
    select: ['a.*', 'b.nickName as nickName'],
  },
})
export class CommunityPostController extends BaseController {
  @Inject()
  appCommunityPostService: AppCommunityPostService;
}
