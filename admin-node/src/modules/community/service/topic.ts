import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { CommunityTopicEntity } from '../entity/topic';

/**
 * 社区话题
 */
@Provide()
export class CommunityTopicService extends BaseService {
  @InjectEntityModel(CommunityTopicEntity)
  communityTopicEntity: Repository<CommunityTopicEntity>;
}
