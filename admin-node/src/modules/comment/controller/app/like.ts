import { Inject, Post, Query } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { CommentLikeService } from '../../service/like';
import { CommentLikeEntity } from '../../entity/like';
import { UserInfoEntity } from '../../../user/entity/info';
import { CommentInfoEntity } from '../../entity/info';

/**
 * 评论点赞
 */
@CoolController({
  api: ['page'],
  entity: CommentLikeEntity,
  service: CommentLikeService,
  pageQueryOp: {
    fieldEq: ['a.commentId', 'a.userId'],
    join: [
      {
        entity: UserInfoEntity,
        alias: 'b',
        condition: 'a.userId = b.id',
        type: 'leftJoin',
      },
      {
        entity: CommentInfoEntity,
        alias: 'c',
        condition: 'a.commentId = c.id',
        type: 'leftJoin',
      },
    ],
    select: ['a.*', 'b.nickName', 'b.avatarUrl', 'c.content'],
  },
})
export class AppCommentLikeController extends BaseController {
  @Inject()
  commentLikeService: CommentLikeService;

  @Inject()
  ctx;

  /**
   * 点赞或取消点赞
   * @param commentId
   */
  @Post('/likeOrUnlike', { summary: '点赞或取消点赞' })
  async like(@Query('commentId') commentId: number) {
    const userId = this.ctx.user.id;
    return this.ok(
      await this.commentLikeService.likeOrUnlike(userId, commentId)
    );
  }
}
