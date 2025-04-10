import { Body, Get, Inject, Post, Query } from '@midwayjs/core';
import {
  CoolController,
  BaseController,
  CoolTag,
  TagTypes,
} from '@cool-midway/core';
import { CommentInfoService } from '../../service/info';
import { CommentLikeService } from '../../service/like';

export abstract class BaseCommentController extends BaseController {
  // 子类需要定义自己的评论类型
  abstract commentType: number;

  @Inject()
  commentInfoService: CommentInfoService;

  @Inject()
  commentLikeService: CommentLikeService;

  // 发送评论：在添加评论成功后，调用扩展钩子更新关联实体的 count
  @Post('/sendComment', { summary: '发送评论' })
  async addComment(
    @Body()
    body: {
      objectId: number;
      content: string;
      parentId?: number;
      replyTo?: string;
    }
  ) {
    const { objectId, content, parentId, replyTo } = body;
    const comment = await this.commentInfoService.createComment(
      this.commentType,
      objectId,
      content,
      parentId,
      replyTo
    );
    // 调用钩子方法，对发送评论后的其他业务逻辑进行处理
    await this.afterAddComment(comment);
    return this.ok(comment);
  }

  // 点赞或取消点赞：完成操作后调用扩展钩子处理实体的 count 修改逻辑
  @Post('/likeOrUnlike', { summary: '点赞或取消点赞评论' })
  async likeOrUnlike(@Body() body: { commentId: number; objectId: number }) {
    const { commentId } = body;
    const result = await this.commentLikeService.likeOrUnlike(commentId);
    // 调用钩子方法，对点赞操作后的业务进行扩展处理
    await this.afterLikeOrUnlike(result);
    return this.ok(result);
  }

  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Get('/getPageComment', { summary: '获取页面评论' })
  async getPageComment(
    @Query() params: { id: string; page: number; limit: number }
  ) {
    const { id, page, limit } = params;
    const comments = await this.commentInfoService.getPageComment(
      id,
      page,
      limit
    );
    return this.ok(comments);
  }

  @Post('/delComment', { summary: '删除评论' })
  async deleteComment(@Query('id') id: number) {
    const result = await this.commentInfoService.deleteComment(
      id,
      this.commentType
    );
    await this.afterDelComment(result);
    return this.ok(result);
  }

  /**
   * 钩子方法：删除评论之后的业务处理，比如修改对应实体的评论数量
   * 默认实现为空，子类可根据需要覆写
   */
  protected async afterDelComment(result: any): Promise<void> {
    // 默认不做处理，供子类实现具体逻辑
  }

  /**
   * 钩子方法：发送评论之后的业务处理，比如修改对应实体的评论数量
   * 默认实现为空，子类可根据需要覆写
   */
  protected async afterAddComment(comment: any): Promise<void> {
    // 默认不做处理，供子类实现具体逻辑
  }

  /**
   * 钩子方法：点赞/取消点赞操作之后的业务处理，比如同步修改实体的点赞数量
   * 默认实现为空，子类可根据需要覆写
   */
  protected async afterLikeOrUnlike(result: any): Promise<void> {
    // 默认不做处理，供子类实现具体逻辑
  }
}
