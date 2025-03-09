import { Inject, Provide } from '@midwayjs/core';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { UserInfoEntity } from '../entity/info';
import * as md5 from 'md5';

/**
 * 用户服务
 */
@Provide()
export class UserInfoService extends BaseService {
  @InjectEntityModel(UserInfoEntity)
  userInfoEntity: Repository<UserInfoEntity>;

  /**
   * 注册
   * @param phone
   * @param password
   */
  async register(phone: string, password: string) {
    const exist = await this.userInfoEntity.findOneBy({ phone });
    if (exist) {
      throw new CoolCommException('手机号已存在');
    }

    const nickName = `用户${phone}`;
    const encryptedPassword = md5(password);

    await this.userInfoEntity.insert({
      phone,
      password: encryptedPassword,
      nickName,
      loginType: 2, // H5
    });
  }
}
