import { CommentInfoEntity } from '../../entity/info';
import { CommentInfoService } from '../../service/info';
import { Body, Get, Inject, Post, Query } from '@midwayjs/core';
import {
  CoolController,
  BaseController,
  CoolTag,
  TagTypes,
} from '@cool-midway/core';
import { UserInfoEntity } from '../../../user/entity/info';
import { BaseCommentController } from './baseCommentController';
/**
 * 评论
 */
@CoolController({
  api: ['page'],
  entity: CommentInfoEntity,
  service: CommentInfoService,
  pageQueryOp: {
    keyWordLikeFields: ['a.content'],
    fieldEq: ['a.goodsId', 'a.userId', 'a.parentId'],
    join: [
      {
        entity: UserInfoEntity,
        alias: 'b',
        condition: 'a.userId = b.id',
        type: 'leftJoin',
      },
    ],
    select: ['a.*', 'b.nickName as nickName', 'b.avatarUrl as avatarUrl'],
  },
})
export class commentController extends BaseController {
  @Inject()
  commentInfoService: CommentInfoService;

  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Get('/getCommentRec', { summary: '获取社区高赞评论' })
  async getCommentRec() {
    return this.ok(await this.commentInfoService.getCommentRec());
  }

  // /* 穿搭方面评论 */
  // @CoolTag(TagTypes.IGNORE_TOKEN)
  // @Get('/getPageComment', { summary: '获取文章页面评论' })
  // async getPageComment(
  //   @Query() params: { id: string; page: number; limit: number }
  // ) {
  //   const { id, page, limit } = params;
  //   return this.ok(
  //     await this.commentInfoService.getPageComment(id, page, limit)
  //   );
  // }

  // @Post('/sendComment', { summary: '发送文章评论' })
  // async addComment(
  //   @Body()
  //   body: {
  //     objectId: number;
  //     content: string;
  //     parentId?: number;
  //     replyTo?: string;
  //   }
  // ) {
  //   const { objectId, content, parentId, replyTo } = body;
  //   return this.ok(
  //     await this.commentInfoService.createComment(
  //       1,
  //       objectId,
  //       content,
  //       parentId,
  //       replyTo
  //     )
  //   );
  // }

  // @Post('/delComment', { summary: '删除文章评论' })
  // async deleteComment(@Query('id') id: number) {
  //   return this.ok(await this.commentInfoService.deleteComment(id, 1));
  // }

  // @Post('/likeOrUnlike', { summary: '点赞或取消点赞文章评论' })
  // async likeOrUnlike() {}
}
