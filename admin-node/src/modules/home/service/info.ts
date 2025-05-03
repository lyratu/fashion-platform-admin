import { Inject, Provide } from '@midwayjs/core';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { carouselEntity } from '../entity/carousel';

/**
 * 穿搭信息
 */
@Provide()
export class HomeInfoService extends BaseService {
  @InjectEntityModel(carouselEntity)
  carouselEntity: Repository<carouselEntity>;

  /**
   * 新增
   * @param param
   * @returns
   */
  async add(param: any) {
    // 调用原本的add，如果不需要可以不用这样写，完全按照自己的新增逻辑写
    const list = await this.carouselEntity.find();
    if (list.length < 3) {
      return await super.add(param);
    } else {
      throw new CoolCommException('最多三张轮播图！');
    }
  }
  async delete(ids: any): Promise<void> {
    const count = await this.carouselEntity.count();
    if (count < 2) throw new CoolCommException('轮播图最少保留一张！');
    const result = super.delete(ids);
    return result;
  }
  async getCarousel() {
    const list = await this.carouselEntity.find();
    return list;
  }
}
