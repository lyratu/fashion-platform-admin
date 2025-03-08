import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const navigate = useNavigate()

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold">服装社区</Link>

        <nav className="hidden space-x-6 md:flex">
          <Link to="/" className="hover:text-primary">首页</Link>
          <Link to="/products" className="hover:text-primary">商品</Link>
          <Link to="/community" className="hover:text-primary">社区</Link>
          <Link to="/about" className="hover:text-primary">关于我们</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="hover:text-primary">
            <div className="indicator">
              <span className="badge badge-primary badge-sm indicator-item">0</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </Link>

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="/avatar-placeholder.png" alt="用户头像" />
              </div>
            </label>
            <ul tabIndex={0} className="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow">
              <li><Link to="/profile">个人中心</Link></li>
              <li><Link to="/orders">我的订单</Link></li>
              <li><Link to="/favorites">我的收藏</Link></li>
              <li><a>退出登录</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
