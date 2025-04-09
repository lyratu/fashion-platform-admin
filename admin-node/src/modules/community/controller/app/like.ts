import { Inject, Post, Query } from '@midwayjs/core';
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

  @Inject()
  ctx;

  @Post('/likeOrUnlike', { summary: '点赞或取消点赞' })
  async likeOrUnlike(@Query('postId') postId: number) {
    const userId = this.ctx.user.id;
    const likeRecord = await this.communityLikeService.getLikeRecord(
      postId,
      userId
    );
    if (likeRecord) {
      likeRecord.likeStatus === 1
        ? await this.appCommunityPostService.decrementLikeCount(postId)
        : await this.appCommunityPostService.incrementLikeCount(postId);
      likeRecord.likeStatus = likeRecord.likeStatus === 1 ? 0 : 1;
      likeRecord.operateTime = new Date();
      await this.communityLikeService.communityLikeEntity.save(likeRecord);
      return this.ok(likeRecord);
    } else {
      const newLikeRecord = {
        postId,
        userId,
        likeStatus: 1,
        operateTime: new Date(),
      };
      await this.appCommunityPostService.incrementLikeCount(postId);
      await this.communityLikeService.communityLikeEntity.insert(newLikeRecord);
      return this.ok(newLikeRecord);
    }
  }
}
