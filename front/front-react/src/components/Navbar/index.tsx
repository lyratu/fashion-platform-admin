import { Link, useLocation } from 'react-router-dom'
import CartDropdown from '../CartDropdown'
import UserDropdown from '../UserDropdown'

function Navbar() {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-base-300' : ''
  }

  return (
    <div className="navbar fixed top-0 z-50 bg-base-100 shadow-xl">
      <div className="container mx-auto">
        {/* Logo */}
        <div className="flex-none">
          <Link to="/" className="btn btn-ghost text-xl">
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            时尚衣橱
          </Link>
        </div>

        {/* 导航链接 */}
        <div className="flex-1 px-2">
          <ul className="menu menu-horizontal">
            <li>
              <Link to="/" className={`text-base ${isActive('/')}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                首页
              </Link>
            </li>
            <li>
              <Link
                to="/outfits"
                className={`text-base ${isActive('/outfits')}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                穿搭分享
              </Link>
            </li>
            <li>
              <Link to="/shop" className={`text-base ${isActive('/shop')}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                商城
              </Link>
            </li>
            <li>
              <Link
                to="/community"
                className={`text-base ${isActive('/community')}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
                社区
              </Link>
            </li>
          </ul>
        </div>

        {/* 购物车和用户菜单 */}
        <div className="flex-none gap-2">
          <CartDropdown />
          <UserDropdown />
        </div>
      </div>
    </div>
  )
}

export default Navbar
