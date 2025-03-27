import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { CommentInfoEntity } from '../entity/info';

/**
 * 评论信息
 */
@Provide()
export class CommentInfoService extends BaseService {
  @InjectEntityModel(CommentInfoEntity)
  commentInfoEntity: Repository<CommentInfoEntity>;

  async getCommentRec() {
    const list = await this.commentInfoEntity
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.user', 'user')
      .orderBy('c.likeCount', 'DESC')
      .limit(3)
      .getMany();
    return list;
  }
}
