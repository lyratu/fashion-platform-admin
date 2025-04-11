import {
  CoolController,
  BaseController,
  CoolUrlTag,
  CoolTag,
  TagTypes,
} from '@cool-midway/core';
import { OutfitsInfoEntity } from '../../entity/info';
import { OutfitsInfoService } from '../../service/info';
import { Context } from '@midwayjs/koa';
import { Get, Inject, Post, Query } from '@midwayjs/core';
import { UserInfoEntity } from '../../../user/entity/info';
import { DictInfoEntity } from '../../../dict/entity/info';
import { BaseCommentController } from '../../../comment/controller/app/baseCommentController';
/**
 * 穿搭分享-前台接口
 */
@CoolUrlTag({
  key: TagTypes.IGNORE_TOKEN,
  value: ['page', 'info'],
})
@CoolController({
  api: ['page', 'info'],
  entity: OutfitsInfoEntity,
  service: OutfitsInfoService,
  pageQueryOp: {
    keyWordLikeFields: ['a.title'],
    fieldEq: ['a.category', 'a.season'],
    join: [
      {
        entity: UserInfoEntity,
        alias: 'b',
        condition: 'a.authorId = b.id',
        type: 'leftJoin',
      },
      {
        entity: DictInfoEntity,
        alias: 'c',
        condition: 'a.category = c.value AND c.typeId = 21',
        type: 'leftJoin',
      },
    ],
    select: [
      'a.*',
      "JSON_OBJECT('nickName', b.nickName, 'avatarUrl', b.avatarUrl,'id', b.id,'position', b.position) as user",
      "JSON_OBJECT('name',c.name,'typeId',c.typeId,'value',c.value) as categoryText",
    ],
  },
})
export class AppOutfitsInfoController extends BaseCommentController {
  commentType = 1;

  @Inject()
  OutfitsInfoService: OutfitsInfoService;

  @Inject()
  ctx: Context;

  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Get('/getOutfitsRec', { summary: '获取穿搭分享高赞' })
  async getOutfitsRec(@Query('type') type: number) {
    return this.ok(await this.OutfitsInfoService.getOutfitsRec(type));
  }

  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Get('/getRelatedArticles', { summary: '获取相关文章' })
  async getRelatedArticles(@Query('id') id: number) {
    return this.ok(await this.OutfitsInfoService.getRelatedArticles(id));
  }

  /* 文章评论列表获取 */
  @Get('/getPageComment', { summary: '文章评论列表获取' })
  async getPageComment(params: {
    id: string;
    page: number;
    limit: number;
  }): Promise<{ code: number; message: string }> {
    return super.getPageComment(params);
  }

  /* 文章评论发布 */
  @Post('/sendComment', { summary: '发送评论' })
  async addComment(body: {
    objectId: number;
    content: string;
    parentId?: number;
    replyTo?: string;
  }): Promise<{ code: number; message: string }> {
    return super.addComment(body);
  }

  protected async afterAddComment(comment: any): Promise<void> {
    console.log('[ 文章评论列表已获取 ] >', 1);
  }

  /* 文章评论点赞 */
  async likeOrUnlike(body: {
    commentId: number;
    objectId: number;
  }): Promise<{ code: number; message: string }> {
    return super.likeOrUnlike(body);
  }

  protected async afterLikeOrUnlike(result: any): Promise<void> {
    console.log('[ 文章评论已点赞 ] >', 1);
  }

  /* 文章评论删除 */
  async deleteComment(id: number): Promise<{ code: number; message: string }> {
    return super.deleteComment(id);
  }

  protected async afterDelComment(result: any): Promise<void> {
    console.log('[ 文章评论已删除 ] >', 1);
  }
}
