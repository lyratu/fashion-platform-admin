import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userApi } from '../api/user'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await userApi.loginByPassword(formData)
      // 保存token到localStorage
      localStorage.setItem('token', data.token)
      // 登录成功后跳转到首页
      navigate('/')
    } catch (error) {
      console.error('登录错误:', error)
      alert(error instanceof Error ? error.message : '登录出错，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-6 rounded bg-white p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold">登录</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">手机号</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="请输入手机号"
              className="input input-bordered w-full"
              required
              pattern="^1[3-9]\d{9}$"
              title="请输入正确的手机号码"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">密码</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="请输入密码"
              className="input input-bordered w-full"
              required
              minLength={6}
            />
          </div>
          <div className="form-control">
            <label className="label cursor-pointer flex justify-start gap-4">
              <input type="checkbox" className="checkbox" />
              <span className="label-text">记住我</span>
            </label>
          </div>
          <button
            type="submit"
            className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>
        <p className="text-center flex justify-between">
          <a href="/" className="text-blue-500">
            返回首页
          </a>
          <a href="/register" className="text-blue-500">
            立即注册
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
