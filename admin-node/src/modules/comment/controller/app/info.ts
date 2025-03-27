import { CommentInfoEntity } from '../../entity/info';
import { CommentInfoService } from '../../service/info';
import { Get, Inject } from '@midwayjs/core';
import {
  CoolController,
  BaseController,
  CoolTag,
  TagTypes,
} from '@cool-midway/core';
/**
 * 轮播图
 */
@CoolController({
  entity: CommentInfoEntity,
  service: CommentInfoService,
  api: [],
})
export class commentController extends BaseController {
  @Inject()
  goodsService: CommentInfoService;

  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Get('/getCommentRec', { summary: '获取高赞评论' })
  async getCommentRec() {
    return this.ok(await this.goodsService.getCommentRec());
  }
}
