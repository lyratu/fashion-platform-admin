import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { ClothesSuitEntity } from '../entity/suit';

/**
 * 搭配信息
 */
@Provide()
export class ClothesSuitService extends BaseService {
  @InjectEntityModel(ClothesSuitEntity)
  clothesSuitEntity: Repository<ClothesSuitEntity>;
}
