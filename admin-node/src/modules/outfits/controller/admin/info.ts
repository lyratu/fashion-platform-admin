import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { OutfitsInfoEntity } from '../../entity/info';
import { BaseSysUserEntity } from '../../../base/entity/sys/user';
import { OutfitsInfoService } from '../../service/info';
import { DictTypeEntity } from '../../../dict/entity/type';

/**
 * 穿搭文章
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
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
export class AdminOutfitsArticleController extends BaseController {
  @Inject()
  outfitsArticleService: OutfitsInfoService;
}
