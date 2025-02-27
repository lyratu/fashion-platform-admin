import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 处理登录逻辑
    console.log('登录信息:', { email, password })
    // 登录成功后跳转到首页
    navigate('/')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f7f8fc' }}>
      <div className="flex min-h-screen items-center bg-base-200">
        <div className="card mx-auto w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4 text-center text-2xl font-bold">
              登录
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">邮箱</span>
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">密码</span>
                </label>
                <input
                  type="password"
                  placeholder="输入密码"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="label">
                  <a href="#" className="link-hover link label-text-alt">
                    忘记密码?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">登录</button>
              </div>
            </form>
            <div className="divider">或者</div>
            <div className="form-control">
              <button className="btn btn-outline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                使用访客账号
              </button>
            </div>
            <p className="mt-4 text-center">
              还没有账号？{' '}
              <a href="#" className="link link-primary">
                立即注册
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
