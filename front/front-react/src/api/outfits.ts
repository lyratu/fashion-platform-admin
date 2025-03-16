import request, { post, get } from '../utils/request'

export const outfitsApi = {
  // 获取穿搭分享文章列表
  getOutfitsList() {
    return post('/app/outfits/info/page')
  }
}
