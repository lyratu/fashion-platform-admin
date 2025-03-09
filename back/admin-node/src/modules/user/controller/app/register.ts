import { Inject, Post, Body, Provide } from '@midwayjs/core';
import {
  CoolController,
  BaseController,
  CoolUrlTag,
  TagTypes,
  CoolTag,
  CoolCommException,
} from '@cool-midway/core';
import { UserInfoService } from '../../service/register';
import { UserInfoEntity } from '../../../user/entity/info';
import { Context } from '@midwayjs/koa';

/**
 * 客户端用户
 */
@CoolUrlTag()
@CoolController()
export class AppInfoController extends BaseController {
  @Inject()
  userInfoService: UserInfoService;

  @Inject()
  ctx: Context;

  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Post('/password', { summary: '注册' })
  async register(
    @Body('phone') phone: string,
    @Body('password') password: string
  ) {
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      throw new CoolCommException('手机号格式不正确');
    }

    if (password.length < 6) {
      throw new CoolCommException('密码长度不能小于6位');
    }

    await this.userInfoService.register(phone, password);
    return this.ok();
  }
}
