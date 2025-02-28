import React from 'react'

const Login: React.FC = () => {
  let counter = 10
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">登录</h2>
        <form className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">邮箱</span>
            </label>
            <input
              type="email"
              placeholder="请输入用户名"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">密码</span>
            </label>
            <input
              type="password"
              placeholder="请输入密码"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label cursor-pointer flex justify-start gap-4">
              <input type="checkbox" className="checkbox" />
              <span className="label-text">记住我</span>
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-full">
            登录
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
