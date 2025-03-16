import { CoolController, BaseController, CoolUrlTag } from '@cool-midway/core';
import { OutfitsInfoEntity } from '../../entity/info';
import { OutfitsInfoService } from '../../service/info';
import { Context } from '@midwayjs/koa';
import { Get, Inject } from '@midwayjs/core';
import { BaseSysUserEntity } from '../../../base/entity/sys/user';
import { DictTypeEntity } from '../../../dict/entity/type';

/**
 * 穿搭分享-前台接口
 */
@CoolController({
  api: ['page'],
  entity: OutfitsInfoEntity,
  service: OutfitsInfoService,
  pageQueryOp: {
    keyWordLikeFields: ['a.title'],
    fieldEq: ['a.category', 'a.season'],
    join: [
      {
        entity: BaseSysUserEntity,
        alias: 'b',
        condition: 'a.authorId = b.id',
        type: 'leftJoin',
      },
      {
        entity: DictTypeEntity,
        alias: 'c',
        condition: 'a.category = c.id',
        type: 'leftJoin',
      },
      {
        entity: DictTypeEntity,
        alias: 'd',
        condition: 'a.season = d.id',
        type: 'leftJoin',
      },
    ],
    select: [
      'a.*',
      'b.nickName as authorName',
      'c.name as categoryName',
      'd.name as seasonName',
    ],
  },
})
export class AppOutfitsInfoController extends BaseController {
  @Inject()
  OutfitsInfoService: OutfitsInfoService;

  @Inject()
  ctx: Context;
}
