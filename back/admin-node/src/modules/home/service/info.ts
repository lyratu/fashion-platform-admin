import { Inject, Provide } from '@midwayjs/core';
import { BaseService, CoolCommException } from '@cool-midway/core';
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

  /**
   * 新增
   * @param param
   * @returns
   */
  async add(param: any) {
    // 调用原本的add，如果不需要可以不用这样写，完全按照自己的新增逻辑写
    const list = await this.outfitsInfoEntity.find();
    if (list.length < 3) {
      return await super.add(param);
    } else {
      throw new CoolCommException('最多三张轮播图！');
    }
  }
}
