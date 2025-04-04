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
/**
 * 轮播图
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

  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Get('/getPageComment', { summary: '获取文章页面评论' })
  async getPageComment(
    @Query('id') id: string,
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    return this.ok(
      await this.commentInfoService.getPageComment(id, page, limit)
    );
  }

  @Post('/sendComment', { summary: '发送文章评论' })
  async addComment(
    @Body('objectId') objectId: number,
    @Body('content') content: string
  ) {
    return this.ok(
      await this.commentInfoService.addComment(objectId, content, 1)
    );
  }
}
