import {
  CoolController,
  BaseController,
  CoolUrlTag,
  CoolTag,
  TagTypes,
} from '@cool-midway/core';
import { OutfitsInfoEntity } from '../../entity/info';
import { OutfitsInfoService } from '../../service/info';
import { Context } from '@midwayjs/koa';
import { Get, Inject, Query } from '@midwayjs/core';
import { BaseSysUserEntity } from '../../../base/entity/sys/user';
import { DictTypeEntity } from '../../../dict/entity/type';

/**
 * 穿搭分享-前台接口
 */
@CoolUrlTag({
  key: TagTypes.IGNORE_TOKEN,
  value: ['page'],
})
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
  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Get('/getOutfitsRec', { summary: '获取穿搭分享高赞' })
  async getOutfitsRec(@Query('type') type: number) {
    return this.ok(await this.OutfitsInfoService.getOutfitsRec(type));
  }
}
