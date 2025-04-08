import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { CommunityLikeEntity } from '../entity/like';

/**
 * 点赞记录
 */
@Provide()
export class CommunityLikeService extends BaseService {
  @InjectEntityModel(CommunityLikeEntity)
  communityLikeEntity: Repository<CommunityLikeEntity>;
}
