import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  getOrderDetail,
  cancelOrder,
  confirmReceived,
  OrderStatus
} from '../../api/order'
import { Link } from 'react-router-dom'
import { showToast } from '../../utils/toast'

// 订单状态映射
const orderStatusMap = {
  [OrderStatus.PENDING_PAYMENT]: { text: '待付款', step: 0 },
  [OrderStatus.PAID]: { text: '已付款', step: 1 },
  [OrderStatus.SHIPPED]: { text: '已发货', step: 2 },
  [OrderStatus.DELIVERED]: { text: '已送达', step: 2 },
  [OrderStatus.COMPLETED]: { text: '已完成', step: 3 },
  [OrderStatus.CANCELLED]: { text: '已取消', step: -1 },
  [OrderStatus.REFUNDING]: { text: '退款中', step: -1 },
  [OrderStatus.REFUNDED]: { text: '已退款', step: -1 }
}

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [orderData, setOrderData] = useState<any>(null)

  useEffect(() => {
    if (orderId) {
      fetchOrderDetail()
    }
  }, [orderId])

  const fetchOrderDetail = async () => {
    try {
      setLoading(true)
      const res = await getOrderDetail(orderId!)
      if (res.code === 200) {
        setOrderData(res.data)
      } else {
        showToast(res.message || '获取订单详情失败', 'error')
      }
    } catch (error) {
      console.error('获取订单详情出错:', error)
      showToast('获取订单详情失败，请稍后重试', 'error')
    } finally {
      setLoading(false)
    }
  }

  // 取消订单
  const handleCancelOrder = async () => {
    if (!window.confirm('确定要取消该订单吗？')) return

    try {
      const res = await cancelOrder(orderId!)
      if (res.code === 200) {
        showToast('订单已取消', 'success')
        fetchOrderDetail()
      } else {
        showToast(res.message || '取消订单失败', 'error')
      }
    } catch (error) {
      console.error('取消订单出错:', error)
      showToast('取消订单失败，请稍后重试', 'error')
    }
  }

  // 确认收货
  const handleConfirmReceived = async () => {
    if (!window.confirm('确认已收到商品吗？')) return

    try {
      const res = await confirmReceived(orderId!)
      if (res.code === 200) {
        showToast('已确认收货', 'success')
        fetchOrderDetail()
      } else {
        showToast(res.message || '确认收货失败', 'error')
      }
    } catch (error) {
      console.error('确认收货出错:', error)
      showToast('确认收货失败，请稍后重试', 'error')
    }
  }

  // 去支付
  const handleGoToPay = () => {
    navigate(`/order/payment/${orderId}?method=alipay`)
  }

  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (!orderData) {
    return (
      <div className="container mx-auto p-4">
        <div className="rounded bg-white p-6 shadow">
          <p className="text-center text-gray-500">订单信息不存在</p>
        </div>
      </div>
    )
  }

  const currentStep = orderStatusMap[orderData.status]?.step ?? -1

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-2xl font-bold">订单详情</h2>
      <div className="space-y-6">
        {/* 订单状态进度 */}
        <div className="rounded bg-white p-6 shadow">
          <ul className="steps steps-horizontal w-full">
            <li className={`step ${currentStep >= 0 ? 'step-primary' : ''}`}>提交订单</li>
            <li className={`step ${currentStep >= 1 ? 'step-primary' : ''}`}>付款成功</li>
            <li className={`step ${currentStep >= 2 ? 'step-primary' : ''}`}>商品出库</li>
            <li className={`step ${currentStep >= 3 ? 'step-primary' : ''}`}>交易完成</li>
          </ul>
        </div>

        {/* 订单信息 */}
        <div className="rounded bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-bold">订单信息</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">订单编号：{orderData.id}</p>
              <p className="text-gray-500">创建时间：{orderData.createTime}</p>
              <p className="text-gray-500">支付方式：{orderData.paymentMethod}</p>
            </div>
            <div>
              <p className="text-gray-500">订单状态：
                <span className={`badge badge-${getStatusColor(orderData.status)}`}>
                  {orderStatusMap[orderData.status]?.text}
                </span>
              </p>
              {orderData.trackingNumber && (
                <p className="text-gray-500">
                  物流单号：
                  <span className="text-blue-500">{orderData.trackingNumber}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 收货信息 */}
        <div className="rounded bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-bold">收货信息</h3>
          <div>
            <p className="text-gray-500">收货人：{orderData.shippingName}</p>
            <p className="text-gray-500">联系电话：{orderData.shippingPhone}</p>
            <p className="text-gray-500">收货地址：{orderData.shippingAddress}</p>
          </div>
        </div>

        {/* 商品信息 */}
        <div className="rounded bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-bold">商品信息</h3>
          <div className="space-y-4">
            {orderData.orderItems.map((item: any) => (
              <div key={item.id} className="flex items-center border-b pb-4">
                <img
                  src={item.productImage}
                  alt={item.productTitle}
                  className="mr-4 size-20 rounded object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.productTitle}</h4>
                  <p className="text-sm text-gray-500">数量：{item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">¥{item.price}</p>
                  <p className="text-sm text-gray-500">
                    小计：¥{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right">
            <p className="text-gray-500">
              商品总价：<span className="font-medium">¥{orderData.totalAmount}</span>
            </p>
            <p className="text-gray-500">
              运费：<span className="font-medium">¥0.00</span>
            </p>
            <p className="text-lg font-bold text-red-500">
              实付款：¥{orderData.totalAmount}
            </p>
          </div>
        </div>

        {/* 订单操作 */}
        <div className="rounded bg-white p-6 shadow">
          <div className="flex justify-end space-x-4">
            {orderData.status === OrderStatus.PENDING_PAYMENT && (
              <>
                <button
                  className="btn btn-primary"
                  onClick={handleGoToPay}
                >
                  去支付
                </button>
                <button
                  className="btn btn-outline"
                  onClick={handleCancelOrder}
                >
                  取消订单
                </button>
              </>
            )}
            {orderData.status === OrderStatus.SHIPPED && (
              <button
                className="btn btn-primary"
                onClick={handleConfirmReceived}
              >
                确认收货
              </button>
            )}
            <Link to="/orders" className="btn btn-outline">
              返回列表
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// 获取状态对应的颜色
function getStatusColor(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.PENDING_PAYMENT:
      return 'warning'
    case OrderStatus.PAID:
    case OrderStatus.COMPLETED:
      return 'success'
    case OrderStatus.SHIPPED:
    case OrderStatus.DELIVERED:
      return 'info'
    case OrderStatus.CANCELLED:
    case OrderStatus.REFUNDED:
      return 'error'
    case OrderStatus.REFUNDING:
      return 'warning'
    default:
      return 'neutral'
  }
}

export default OrderDetail
