import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { OutfitsInfoEntity } from '../entity/info';

/**
 * 穿搭信息
 */
@Provide()
export class OutfitsInfoService extends BaseService {
  @InjectEntityModel(OutfitsInfoEntity)
  outfitsInfoEntity: Repository<OutfitsInfoEntity>;

  /**
   * 获取文章列表
   * @param id
   * @returns
   */
  async list() {
    return this.outfitsInfoEntity.createQueryBuilder("a").select(["a.*"]).getMany();
  }
}
