import request, { post, get } from '../utils/request'

export const outfitsApi = {
  // 获取穿搭分享文章列表
  getOutfitsList() {
    return get('/app/outfits/info/getOutfitsList')
  }
}
