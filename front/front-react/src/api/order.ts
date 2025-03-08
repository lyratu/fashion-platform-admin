import { get, post } from '../utils/request'

// 定义订单状态
export enum OrderStatus {
  PENDING_PAYMENT = 'PENDING_PAYMENT', // 待付款
  PAID = 'PAID', // 已付款
  SHIPPED = 'SHIPPED', // 已发货
  DELIVERED = 'DELIVERED', // 已送达
  COMPLETED = 'COMPLETED', // 已完成
  CANCELLED = 'CANCELLED', // 已取消
  REFUNDING = 'REFUNDING', // 退款中
  REFUNDED = 'REFUNDED' // 已退款
}

// 定义订单项类型
export interface OrderItem {
  id: number
  productId: number
  productTitle: string
  productImage: string
  price: number
  quantity: number
  totalAmount: number
}

// 定义订单类型
export interface Order {
  id: string
  userId: number
  orderItems: OrderItem[]
  totalAmount: number
  status: OrderStatus
  paymentMethod?: string
  paymentTime?: string
  shippingAddress: string
  shippingName: string
  shippingPhone: string
  trackingNumber?: string
  createTime: string
  updateTime: string
}

// 获取订单列表
export const getOrderList = (params?: {
  page?: number
  pageSize?: number
  status?: OrderStatus
}) => {
  return get<{
    code: number
    data: {
      list: Order[]
      total: number
      page: number
      pageSize: number
    }
    message: string
  }>('/orders', params)
}

// 获取订单详情
export const getOrderDetail = (id: string) => {
  return get<{
    code: number
    data: Order
    message: string
  }>(`/orders/${id}`)
}

// 创建订单
export const createOrder = (data: {
  cartItemIds: number[]
  shippingAddress: string
  shippingName: string
  shippingPhone: string
}) => {
  return post<{
    code: number
    data: {
      orderId: string
    }
    message: string
  }>('/orders/create', data)
}

// 取消订单
export const cancelOrder = (id: string) => {
  return post<{
    code: number
    data: null
    message: string
  }>(`/orders/${id}/cancel`)
}

// 支付订单
export const payOrder = (id: string, paymentMethod: string) => {
  return post<{
    code: number
    data: {
      paymentUrl?: string
    }
    message: string
  }>(`/orders/${id}/pay`, { paymentMethod })
}

// 确认收货
export const confirmReceived = (id: string) => {
  return post<{
    code: number
    data: null
    message: string
  }>(`/orders/${id}/confirm`)
}
