import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getOrderList, cancelOrder, confirmReceived, OrderStatus } from '../../api/order'
import { Order } from '../../types/order'

// 订单状态映射
const orderStatusMap = {
  [OrderStatus.PENDING_PAYMENT]: { text: '待付款', color: 'warning' },
  [OrderStatus.PAID]: { text: '已付款', color: 'success' },
  [OrderStatus.SHIPPED]: { text: '已发货', color: 'info' },
  [OrderStatus.DELIVERED]: { text: '已送达', color: 'secondary' },
  [OrderStatus.COMPLETED]: { text: '已完成', color: 'success' },
  [OrderStatus.CANCELLED]: { text: '已取消', color: 'error' },
  [OrderStatus.REFUNDING]: { text: '退款中', color: 'warning' },
  [OrderStatus.REFUNDED]: { text: '已退款', color: 'error' }
}

const OrderList: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [activeTab, setActiveTab] = useState<string>('all')
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  })

  useEffect(() => {
    fetchOrders()
  }, [activeTab, pagination.current])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const status = activeTab !== 'all' ? activeTab : undefined
      const res = await getOrderList({
        page: pagination.current,
        pageSize: pagination.pageSize,
        status: status as OrderStatus
      })

      if (res.code === 200) {
        setOrders(res.data.list)
        setPagination({
          ...pagination,
          total: res.data.total
        })
      } else {
        // 使用DaisyUI的toast替代antd的message
        showToast(res.message || '获取订单列表失败', 'error')
      }
    } catch (error) {
      console.error('获取订单列表出错:', error)
      showToast('获取订单列表失败，请稍后重试', 'error')
    } finally {
      setLoading(false)
    }
  }

  // 显示提示信息
  const showToast = (content: string, type: 'success' | 'error' | 'info' | 'warning') => {
    // 创建toast元素
    const toast = document.createElement('div')
    toast.className = `toast toast-top toast-center`

    const alert = document.createElement('div')
    alert.className = `alert alert-${type}`
    alert.textContent = content

    toast.appendChild(alert)
    document.body.appendChild(toast)

    // 3秒后移除
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 3000)
  }

  // 取消订单
  const handleCancelOrder = async (orderId: string) => {
    if (!window.confirm('确定要取消该订单吗？')) return

    try {
      const res = await cancelOrder(orderId)
      if (res.code === 200) {
        showToast('订单已取消', 'success')
        fetchOrders()
      } else {
        showToast(res.message || '取消订单失败', 'error')
      }
    } catch (error) {
      console.error('取消订单出错:', error)
      showToast('取消订单失败，请稍后重试', 'error')
    }
  }

  // 确认收货
  const handleConfirmReceived = async (orderId: string) => {
    if (!window.confirm('确认已收到商品吗？')) return

    try {
      const res = await confirmReceived(orderId)
      if (res.code === 200) {
        showToast('已确认收货', 'success')
        fetchOrders()
      } else {
        showToast(res.message || '确认收货失败', 'error')
      }
    } catch (error) {
      console.error('确认收货出错:', error)
      showToast('确认收货失败，请稍后重试', 'error')
    }
  }

  // 去支付
  const handleGoToPay = (orderId: string) => {
    navigate(`/order/payment/${orderId}?method=alipay`)
  }

  // 渲染订单操作按钮
  const renderOrderActions = (order: Order) => {
    switch (order.status) {
      case OrderStatus.PENDING_PAYMENT:
        return (
          <div className="space-x-2">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleGoToPay(order.id)}
            >
              去支付
            </button>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => handleCancelOrder(order.id)}
            >
              取消订单
            </button>
          </div>
        )
      case OrderStatus.PAID:
        return (
          <div className="space-x-2">
            <button className="btn btn-outline btn-sm" disabled>
              等待发货
            </button>
          </div>
        )
      case OrderStatus.SHIPPED:
        return (
          <div className="space-x-2">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleConfirmReceived(order.id)}
            >
              确认收货
            </button>
            <button className="btn btn-outline btn-sm">
              查看物流
            </button>
          </div>
        )
      case OrderStatus.DELIVERED:
        return (
          <div className="space-x-2">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleConfirmReceived(order.id)}
            >
              确认收货
            </button>
          </div>
        )
      case OrderStatus.COMPLETED:
        return (
          <div className="space-x-2">
            <button className="btn btn-outline btn-sm">
              评价
            </button>
            <button className="btn btn-outline btn-sm">
              再次购买
            </button>
          </div>
        )
      default:
        return null
    }
  }

  // 渲染订单状态标签
  const renderStatusBadge = (status: OrderStatus) => {
    const { text, color } = orderStatusMap[status] || { text: '未知状态', color: 'neutral' }
    return <div className={`badge badge-${color}`}>{text}</div>
  }

  // 渲染分页
  const renderPagination = () => {
    const totalPages = Math.ceil(pagination.total / pagination.pageSize)
    if (totalPages <= 1) return null

    return (
      <div className="join">
        <button
          className="join-item btn"
          onClick={() => setPagination({ ...pagination, current: Math.max(1, pagination.current - 1) })}
          disabled={pagination.current === 1}
        >
          «
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            className={`join-item btn ${pagination.current === page ? 'btn-active' : ''}`}
            onClick={() => setPagination({ ...pagination, current: page })}
          >
            {page}
          </button>
        ))}
        <button
          className="join-item btn"
          onClick={() => setPagination({ ...pagination, current: Math.min(totalPages, pagination.current + 1) })}
          disabled={pagination.current === totalPages}
        >
          »
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-2xl font-bold">我的订单</h2>

      {/* 使用DaisyUI的tabs替代antd的Tabs */}
      <div className="tabs tabs-boxed mb-4">
        <a
          className={`tab ${activeTab === 'all' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          全部订单
        </a>
        <a
          className={`tab ${activeTab === OrderStatus.PENDING_PAYMENT ? 'tab-active' : ''}`}
          onClick={() => setActiveTab(OrderStatus.PENDING_PAYMENT)}
        >
          待付款
        </a>
        <a
          className={`tab ${activeTab === OrderStatus.PAID ? 'tab-active' : ''}`}
          onClick={() => setActiveTab(OrderStatus.PAID)}
        >
          待发货
        </a>
        <a
          className={`tab ${activeTab === OrderStatus.SHIPPED ? 'tab-active' : ''}`}
          onClick={() => setActiveTab(OrderStatus.SHIPPED)}
        >
          待收货
        </a>
        <a
          className={`tab ${activeTab === OrderStatus.COMPLETED ? 'tab-active' : ''}`}
          onClick={() => setActiveTab(OrderStatus.COMPLETED)}
        >
          已完成
        </a>
      </div>

      {loading ? (
        <div className="flex h-60 items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-gray-500">暂无订单</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="card bg-base-100 shadow-xl">
              <div className="card-body p-4">
                <div className="mb-4 flex items-center justify-between border-b pb-2">
                  <div>
                    <span className="mr-4 text-gray-500">订单号: {order.id}</span>
                    <span className="text-gray-500">{order.createTime}</span>
                  </div>
                  <div>{renderStatusBadge(order.status)}</div>
                </div>

                <div className="mb-4">
                  {order.orderItems.map((item) => (
                    <div key={item.id} className="mb-2 flex items-center">
                      <img
                        src={item.productImage}
                        alt={item.productTitle}
                        className="mr-4 size-16 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.productTitle}</h4>
                        <p className="text-sm text-gray-500">数量: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">¥{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    to={`/order/detail/${order.id}`}
                    className="link link-primary"
                  >
                    查看详情
                  </Link>
                  <div className="text-right">
                    <p className="mb-2">
                      共 {order.orderItems.length} 件商品，
                      总计: <span className="text-lg font-bold text-red-500">¥{order.totalAmount}</span>
                    </p>
                    {renderOrderActions(order)}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4 flex justify-center">
            {renderPagination()}
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderList
