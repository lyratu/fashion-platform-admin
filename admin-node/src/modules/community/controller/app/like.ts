import { Get, Inject, Post, Query } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { CommunityLikeEntity } from './../../entity/like';
import { CommunityLikeService } from './../../service/like';
import { AppCommunityPostService } from '../../service/app_post';

/**
 * 社区文章点赞
 */
@CoolController({
  api: ['page'],
  entity: CommunityLikeEntity,
  service: CommunityLikeService,
  pageQueryOp: {
    keyWordLikeFields: ['a.name'],
    fieldEq: ['a.status'],
  },
})
export class AppCommunityLikeController extends BaseController {
  @Inject()
  communityLikeService: CommunityLikeService;

  @Inject()
  appCommunityPostService: AppCommunityPostService;

  @Post('/likeOrUnlike', { summary: '点赞或取消点赞' })
  async likeOrUnlike(@Query('postId') postId: number) {
    const result = await this.communityLikeService.likeOrUnlike(postId);
    const likeCount = result.likeStatus
      ? await this.appCommunityPostService.incrementLikeCount(postId)
      : await this.appCommunityPostService.decrementLikeCount(postId);
    return this.ok({ likeStatus: result.likeStatus, likeCount });
  }
  @Get('/likeCount', { summary: '获取用户点赞总数' })
  async getLikeCount(@Query('id') id: number) {
    return this.ok(await this.communityLikeService.getUserLikeCount(id));
  }
}
