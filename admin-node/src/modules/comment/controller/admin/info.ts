import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { CommentInfoEntity } from '../../entity/info';
import { CommentInfoService } from '../../service/info';
import { UserInfoEntity } from '../../../user/entity/info';

/**
 * 评论信息
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: CommentInfoEntity,
  service: CommentInfoService,
  listQueryOp:{
    join: [
      {
        entity: UserInfoEntity,
        alias: 'b',
        condition: 'a.userId = b.id',
        type: 'leftJoin',
      },
    ],
    select: ['a.*', 'b.nickname'],
  },
  pageQueryOp: {
    keyWordLikeFields: ['a.content', 'b.nickname'],
    fieldEq: ['a.type', 'a.objectId'],
    select: ['a.*', 'b.nickname', 'b.avatarUrl'],
    join: [
      {
        entity: UserInfoEntity,
        alias: 'b',
        condition: 'a.userId = b.id',
        type: 'leftJoin',
      },
    ],
    where: async ctx => {
      const { startTime, endTime } = ctx.request.body;
      const where = [];
      if (startTime && endTime) {
        where.push([
          'a.createTime BETWEEN :startTime AND :endTime',
          { startTime, endTime },
        ]);
      }
      return where;
    },
    addOrderBy: {
      likeCount: 'DESC',
      replyCount: 'DESC',
    },
  },
})
export class AdminCommentInfoController extends BaseController {
  @Inject()
  commentInfoService: CommentInfoService;
  @Inject()
  ctx;
}
