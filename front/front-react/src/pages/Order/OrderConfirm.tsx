import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getOrderDetail, createOrder } from '../../api/order'
import { showToast } from '../../utils/toast'

const OrderConfirm: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [orderData, setOrderData] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'alipay'
  })

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRadioChange = (method: string) => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: method
    }))
  }

  const handleSubmit = async () => {
    // 表单验证
    if (!formData.name) {
      showToast('请输入收货人姓名', 'error')
      return
    }
    if (!formData.phone) {
      showToast('请输入联系电话', 'error')
      return
    }
    if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      showToast('请输入正确的手机号码', 'error')
      return
    }
    if (!formData.address) {
      showToast('请输入详细收货地址', 'error')
      return
    }

    try {
      setLoading(true)
      const { address, name, phone, paymentMethod } = formData

      const res = await createOrder({
        cartItemIds: orderData.orderItems.map((item: any) => item.id),
        shippingAddress: address,
        shippingName: name,
        shippingPhone: phone
      })

      if (res.code === 200) {
        showToast('订单创建成功', 'success')
        navigate(`/order/payment/${res.data.orderId}?method=${paymentMethod}`)
      } else {
        showToast(res.message || '创建订单失败', 'error')
      }
    } catch (error) {
      console.error('创建订单出错:', error)
      showToast('创建订单失败，请稍后重试', 'error')
    } finally {
      setLoading(false)
    }
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

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-2xl font-bold">订单确认</h2>
      <div className="rounded bg-white p-6 shadow">
        <h3 className="mb-4 text-xl font-bold">商品信息</h3>
        <div className="mb-6">
          {orderData.orderItems.map((item: any) => (
            <div key={item.id} className="mb-4 flex items-center border-b pb-4">
              <img
                src={item.productImage}
                alt={item.productTitle}
                className="mr-4 size-20 rounded object-cover"
              />
              <div className="flex-1">
                <h4 className="font-bold">{item.productTitle}</h4>
                <p className="text-gray-500">数量: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-red-500">¥{item.price}</p>
                <p className="text-gray-500">小计: ¥{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="mb-4 text-xl font-bold">收货信息</h3>
        <div className="form-control mb-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="label">
                <span className="label-text">收货人</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="请输入收货人姓名"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">联系电话</span>
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="请输入联系电话"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="label">
              <span className="label-text">收货地址</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="textarea textarea-bordered w-full"
              rows={3}
              placeholder="请输入详细收货地址"
            ></textarea>
          </div>
        </div>

        <h3 className="mb-4 text-xl font-bold">支付方式</h3>
        <div className="mb-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div
              className={`card cursor-pointer border p-4 ${formData.paymentMethod === 'alipay' ? 'border-primary' : ''}`}
              onClick={() => handleRadioChange('alipay')}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="radio radio-primary mr-2"
                  checked={formData.paymentMethod === 'alipay'}
                  onChange={() => handleRadioChange('alipay')}
                />
                <div className="flex items-center">
                  <img src="/alipay-logo.png" alt="支付宝" className="w-6 h-6 mr-2" />
                  <span>支付宝</span>
                </div>
              </div>
            </div>
            <div
              className={`card cursor-pointer border p-4 ${formData.paymentMethod === 'wechat' ? 'border-primary' : ''}`}
              onClick={() => handleRadioChange('wechat')}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="radio radio-primary mr-2"
                  checked={formData.paymentMethod === 'wechat'}
                  onChange={() => handleRadioChange('wechat')}
                />
                <div className="flex items-center">
                  <img src="/wechat-logo.png" alt="微信支付" className="w-6 h-6 mr-2" />
                  <span>微信支付</span>
                </div>
              </div>
            </div>
            <div
              className={`card cursor-pointer border p-4 ${formData.paymentMethod === 'creditcard' ? 'border-primary' : ''}`}
              onClick={() => handleRadioChange('creditcard')}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="radio radio-primary mr-2"
                  checked={formData.paymentMethod === 'creditcard'}
                  onChange={() => handleRadioChange('creditcard')}
                />
                <div className="flex items-center">
                  <img src="/card-logo.png" alt="银行卡" className="w-6 h-6 mr-2" />
                  <span>银行卡</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p>商品总价: <span className="font-bold">¥{orderData.totalAmount}</span></p>
              <p>运费: <span className="font-bold">¥0.00</span></p>
            </div>
            <div className="text-right">
              <p className="mb-2">
                应付金额:{' '}
                <span className="text-xl font-bold text-red-500">
                  ¥{orderData.totalAmount}
                </span>
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner loading-sm"></span> : '提交订单'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirm
