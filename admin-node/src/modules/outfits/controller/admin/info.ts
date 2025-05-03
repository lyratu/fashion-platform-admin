import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { OutfitsInfoEntity } from '../../entity/info';
import { OutfitsInfoService } from '../../service/info';
import { DictTypeEntity } from '../../../dict/entity/type';
import { OutfitsTagEntity } from '../../entity/tag';
import { UserInfoEntity } from '../../../user/entity/info';

/**
 * 穿搭文章
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: OutfitsInfoEntity,
  service: OutfitsInfoService,
  pageQueryOp: {
    keyWordLikeFields: ['a.title'],
    fieldEq: ['a.category'],
    join: [
      // {
      //   entity: UserInfoEntity,
      //   alias: 'b',
      //   condition: 'a.authorId = b.id',
      //   type: 'leftJoin',
      // },
      {
        entity: DictTypeEntity,
        alias: 'c',
        condition: 'a.category = c.id',
        type: 'leftJoin',
      },
    ],
    select: ['a.*',  'c.name as categoryName'],
  },
})
export class AdminOutfitsArticleController extends BaseController {
  @Inject()
  outfitsArticleService: OutfitsInfoService;
}
