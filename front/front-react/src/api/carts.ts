import { get, post, put, del } from '../utils/request'

// 定义购物车商品类型
export interface CartItem {
  id: number
  productId: number
  image: string
  title: string
  price: number
  quantity: number
  selected: boolean
  stock?: number // 库存
}

// 获取购物车列表
export const getCartList = () => {
  return get<{
    code: number
    data: CartItem[]
    message: string
  }>('/cart/list')
}

// 添加商品到购物车
export const addToCart = (productId: number, quantity: number = 1) => {
  return post<{
    code: number
    data: null
    message: string
  }>('/cart/add', { productId, quantity })
}

// 更新购物车商品数量
export const updateCartItemQuantity = (id: number, quantity: number) => {
  return put<{
    code: number
    data: null
    message: string
  }>(`/cart/update/${id}`, { quantity })
}

// 更新购物车商品选中状态
export const updateCartItemSelected = (id: number, selected: boolean) => {
  return put<{
    code: number
    data: null
    message: string
  }>(`/cart/selected/${id}`, { selected })
}

// 批量更新购物车商品选中状态
export const updateAllCartItemsSelected = (selected: boolean) => {
  return put<{
    code: number
    data: null
    message: string
  }>('/cart/selected/all', { selected })
}

// 从购物车中删除商品
export const removeFromCart = (id: number) => {
  return del<{
    code: number
    data: null
    message: string
  }>(`/cart/remove/${id}`)
}

// 清空购物车
export const clearCart = () => {
  return del<{
    code: number
    data: null
    message: string
  }>('/cart/clear')
}

// 结算购物车
export const checkoutCart = (cartItemIds: number[]) => {
  return post<{
    code: number
    data: {
      orderId: string
    }
    message: string
  }>('/cart/checkout', { cartItemIds })
}
