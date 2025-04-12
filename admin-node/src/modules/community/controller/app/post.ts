import { Body, Get, Inject, Post, Query } from '@midwayjs/core';
import {
  CoolController,
  BaseController,
  QueryOp,
  CoolTag,
  TagTypes,
} from '@cool-midway/core';
import { CommunityPostEntity } from '../../entity/post';
import { UserInfoEntity } from '../../../user/entity/info';
import { AppCommunityPostService } from '../../service/app_post';
import { CommunityTopicEntity } from '../../entity/topic';
import { SelectQueryBuilder } from 'typeorm';
import { CommunityLikeEntity } from '../../entity/like';
import { BaseCommentController } from '../../../comment/controller/app/baseCommentController';
import { CommunityPostService } from './../../service/post';

/**
 * 社区内容
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: CommunityPostEntity,
  service: AppCommunityPostService,
  pageQueryOp: ctx => {
    return new Promise<QueryOp>(res => {
      res({
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
            condition: 'c.communityPostId = a.id',
            type: 'leftJoin',
          },
          {
            entity: CommunityTopicEntity,
            alias: 'd',
            condition: 'c.communityTopicId = d.id',
            type: 'leftJoin',
          },
          {
            entity: CommunityLikeEntity,
            alias: 'e',
            condition: `a.id = e.postId AND e.userId = ${ctx && ctx.user.id}`,
            type: 'leftJoin',
          },
        ],
        select: [
          'a.*',
          'e.likeStatus',
          "IF(COUNT(d.id)=0, JSON_ARRAY(), JSON_ARRAYAGG(JSON_OBJECT('name', d.name, 'id', d.id))) AS topics",
          "JSON_OBJECT('nickName', b.nickName, 'avatarUrl', b.avatarUrl,'id', b.id,'position', b.position) as user",
        ],
        extend: async (find: SelectQueryBuilder<CommunityPostEntity>) => {
          find.groupBy('a.id,e.likeStatus');
        },
      });
    });
  },
})
export class CommunityPostController extends BaseCommentController {
  commentType = 0;

  @Inject()
  appCommunityPostService: AppCommunityPostService;

  @Inject()
  ctx;

  @Get('/getActiveUser', { summary: '获取社区活跃用户' })
  async getActiveUser() {
    return this.ok(
      await this.appCommunityPostService.queryActiveUsersFromPosts()
    );
  }

  /* 文章评论列表获取 */
  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Get('/getPageComment', { summary: '文章评论列表获取' })
  async getPageComment(
    @Query() params: { id: string; page: number; limit: number }
  ): Promise<{ code: number; message: string }> {
    return super.getPageComment(params);
  }

  protected async afterGetComment(params: any, comment: any): Promise<void> {
    if (comment)
      await this.appCommunityPostService.updateCommentCount(
        params.id,
        comment.total
      );
  }

  /* 文章评论发布 */
  @Post('/sendComment', { summary: '发送评论' })
  async addComment(
    @Body()
    body: {
      objectId: number;
      content: string;
      parentId?: number;
      replyTo?: string;
    }
  ): Promise<{ code: number; message: string }> {
    return super.addComment(body);
  }

  protected async afterAddComment(comment: any): Promise<void> {
    console.log('[ 社区评论列表已获取 ] >', 1);
  }
}
