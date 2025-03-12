import request, { post,get } from '../utils/request';

interface LoginParams {
  phone: string;
  password: string;
}

export const userApi = {
  // 密码登录
  loginByPassword(params: LoginParams) {
    return post('/app/user/login/password', params);
  },
  // 获取个人信息
  getMyInfo(){
    return get('/app/user/info/person')
  }
};
