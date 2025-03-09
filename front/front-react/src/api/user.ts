import request, { post } from '../utils/request';

interface LoginParams {
  phone: string;
  password: string;
}

export const userApi = {
  // 密码登录
  loginByPassword(params: LoginParams) {
    return post('/app/user/login/password', params);
  }
};
