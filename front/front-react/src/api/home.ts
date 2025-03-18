import request, { post, get } from '../utils/request'

export const homeApi = {
  // 获取主页信息
  getHomeInfo() {
    return post('/app/home/info/list', {})
  }
}
