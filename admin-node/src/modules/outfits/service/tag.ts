import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { OutfitsTagEntity } from '../entity/tag';
import { isArray } from 'lodash';

/**
 * 标签
 */
@Provide()
export class OutfitsTagService extends BaseService {
  @InjectEntityModel(OutfitsTagEntity)
  outfitsTagEntity: Repository<OutfitsTagEntity>;

  // async add(param: any) {
  //   if (typeof param === isArray(param)) {
  //     return {}
  //   }
  //   // 调用原本的add，如果不需要可以不用这样写，完全按照自己的新增逻辑写
  //   const result = await super.add(param);
  //   // 你自己的业务逻辑
  //   return result;
  // }
}
