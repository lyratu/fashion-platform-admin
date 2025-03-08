import { get, post } from '../utils/request'

// 定义商品类型
export interface Product {
  id: number
  title: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  mainImage: string
  category: string
  stock: number
  sales: number
  rating: number
  tags?: string[]
}

// 获取商品列表
export const getProductList = (params?: {
  page?: number
  pageSize?: number
  category?: string
  keyword?: string
  sort?: string
}) => {
  return get<{
    code: number
    data: {
      list: Product[]
      total: number
      page: number
      pageSize: number
    }
    message: string
  }>('/products', params)
}

// 获取商品详情
export const getProductDetail = (id: number) => {
  return get<{
    code: number
    data: Product
    message: string
  }>(`/products/${id}`)
}

// 获取推荐商品
export const getRecommendProducts = (id?: number, limit: number = 10) => {
  return get<{
    code: number
    data: Product[]
    message: string
  }>('/products/recommend', { id, limit })
}

// 获取热门商品
export const getHotProducts = (limit: number = 10) => {
  return get<{
    code: number
    data: Product[]
    message: string
  }>('/products/hot', { limit })
}
