import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { homeEntity } from '../entity/info';

/**
 * 穿搭信息
 */
@Provide()
export class HomeInfoService extends BaseService {
  @InjectEntityModel(homeEntity)
  outfitsInfoEntity: Repository<homeEntity>;
}
