import { Inject, Post, Query } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { CommentLikeService } from '../../service/like';
import { CommentLikeEntity } from '../../entity/like';
import { UserInfoEntity } from '../../../user/entity/info';
import { CommentInfoEntity } from '../../entity/info';
import { CommentInfoService } from './../../service/info';

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
  commentInfoService: CommentInfoService;

  /**
   * 点赞或取消点赞
   * @param commentId
   */
  // [ ] 评论通用点赞
  @Post('/likeOrUnlike', { summary: '点赞或取消点赞' })
  async like(@Query('commentId') commentId: number) {
    const result = await this.commentLikeService.likeOrUnlike(commentId);
    const likeCount = result.likeStatus
      ? await this.commentInfoService.incrementLikeCount(commentId)
      : await this.commentInfoService.decrementLikeCount(commentId);
    return this.ok({ likeStatus: result.likeStatus, likeCount });
  }
}
