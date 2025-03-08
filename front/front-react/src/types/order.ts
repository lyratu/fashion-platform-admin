import { OrderStatus } from '../api/order'

// 订单项类型
export interface OrderItem {
  id: number
  productId: number
  productTitle: string
  productImage: string
  price: number
  quantity: number
  totalAmount: number
}

// 订单类型
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
  shippingTime?: string
  completedTime?: string
}

// 订单列表响应类型
export interface OrderListResponse {
  code: number
  data: {
    list: Order[]
    total: number
    page: number
    pageSize: number
  }
  message: string
}
