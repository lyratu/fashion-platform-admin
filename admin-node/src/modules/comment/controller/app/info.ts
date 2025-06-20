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

  // [ ] 评论通用删除
  @Post('/delComment', { summary: '删除文章评论' })
  async deleteComment(@Query() params: { id: number; type: number }) {
    return this.ok(await this.commentInfoService.deleteComment(params));
  }
}
