import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { CommunityPostEntity } from '../entity/post';

/**
 * 社区内容
 */
@Provide()
export class CommunityPostService extends BaseService {
  @InjectEntityModel(CommunityPostEntity)
  communityPostEntity: Repository<CommunityPostEntity>;
}
