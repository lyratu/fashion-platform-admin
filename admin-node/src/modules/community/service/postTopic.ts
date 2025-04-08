import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { CommunityPostTopicEntity } from '../entity/postTopic';

/**
 * 内容话题关联
 */
@Provide()
export class CommunityPostTopicService extends BaseService {
  @InjectEntityModel(CommunityPostTopicEntity)
  communityPostTopicEntity: Repository<CommunityPostTopicEntity>;
}
