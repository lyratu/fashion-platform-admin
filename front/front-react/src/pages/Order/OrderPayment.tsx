import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { getOrderDetail, payOrder } from '../../api/order'
import { showToast } from '../../utils/toast'

const OrderPayment: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>()
  const [searchParams] = useSearchParams()
  const paymentMethod = searchParams.get('method') || 'alipay'
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [orderData, setOrderData] = useState<any>(null)
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending')
  const [countdown, setCountdown] = useState(15 * 60) // 15分钟倒计时

  useEffect(() => {
    if (orderId) {
      fetchOrderDetail()
    }
  }, [orderId])

  // 倒计时
  useEffect(() => {
    if (paymentStatus !== 'pending') return

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [paymentStatus])

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

  const handlePayment = async () => {
    try {
      setLoading(true)
      const res = await payOrder(orderId!, paymentMethod)

      if (res.code === 200) {
        // 模拟支付成功
        setTimeout(() => {
          setPaymentStatus('success')
        }, 2000)
      } else {
        showToast(res.message || '支付失败', 'error')
        setPaymentStatus('failed')
      }
    } catch (error) {
      console.error('支付出错:', error)
      showToast('支付失败，请稍后重试', 'error')
      setPaymentStatus('failed')
    } finally {
      setLoading(false)
    }
  }

  // 格式化倒计时
  const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60)
    const seconds = countdown % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  if (loading && !orderData) {
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

  if (paymentStatus === 'success') {
    return (
      <div className="container mx-auto p-4">
        <div className="rounded bg-white p-6 shadow">
          <div className="text-center">
            <div className="text-success mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">支付成功!</h2>
            <p className="text-gray-500 mb-6">订单号: {orderId}</p>
            <div className="space-x-4">
              <button className="btn btn-primary" onClick={() => navigate('/orders')}>
                查看我的订单
              </button>
              <button className="btn btn-outline" onClick={() => navigate('/')}>
                继续购物
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (paymentStatus === 'failed') {
    return (
      <div className="container mx-auto p-4">
        <div className="rounded bg-white p-6 shadow">
          <div className="text-center">
            <div className="text-error mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">支付失败</h2>
            <p className="text-gray-500 mb-6">请检查您的支付方式或稍后重试</p>
            <div className="space-x-4">
              <button className="btn btn-primary" onClick={() => setPaymentStatus('pending')}>
                重新支付
              </button>
              <button className="btn btn-outline" onClick={() => navigate('/orders')}>
                查看我的订单
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-2xl font-bold">订单支付</h2>
      <div className="rounded bg-white p-6 shadow">
        <div className="mb-6 text-center">
          <p className="mb-2 text-xl font-bold">
            应付金额: <span className="text-2xl text-red-500">¥{orderData.totalAmount}</span>
          </p>
          <p className="text-gray-500">
            订单号: {orderId}
          </p>
          <p className="mt-2 text-orange-500">
            请在 <span className="font-bold">{formatCountdown()}</span> 内完成支付
          </p>
        </div>

        <div className="mb-6">
          <h3 className="mb-4 text-center text-lg font-bold">
            {paymentMethod === 'alipay' ? '支付宝支付' :
             paymentMethod === 'wechat' ? '微信支付' : '银行卡支付'}
          </h3>

          <div className="flex justify-center">
            {paymentMethod === 'alipay' && (
              <div className="text-center">
                <div className="mx-auto mb-4 size-64 bg-gray-100 p-4">
                  <img src="/alipay-qrcode.png" alt="支付宝二维码" className="h-full w-full" />
                </div>
                <p className="text-gray-500">请使用支付宝扫描二维码完成支付</p>
              </div>
            )}

            {paymentMethod === 'wechat' && (
              <div className="text-center">
                <div className="mx-auto mb-4 size-64 bg-gray-100 p-4">
                  <img src="/wechat-qrcode.png" alt="微信支付二维码" className="h-full w-full" />
                </div>
                <p className="text-gray-500">请使用微信扫描二维码完成支付</p>
              </div>
            )}

            {paymentMethod === 'creditcard' && (
              <div className="w-full max-w-md">
                <form className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium">持卡人姓名</label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="请输入持卡人姓名"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">卡号</label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="请输入银行卡号"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium">有效期</label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">CVV</label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="安全码"
                      />
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            className="btn btn-primary btn-lg"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner loading-sm"></span> : '确认支付'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => navigate('/orders')}
          >
            稍后支付
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderPayment
