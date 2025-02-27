import { Link } from 'react-router-dom'

function UserDropdown() {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
        <div className="w-10 rounded-full">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            alt="avatar"
          />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm z-30 mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
      >
        <li>
          <a className="justify-between">
            个人资料
            <span className="badge">新</span>
          </a>
        </li>
        <li>
          <a>设置</a>
        </li>
        <li>
          <Link to="/login">退出登录</Link>
        </li>
      </ul>
    </div>
  )
}

export default UserDropdown
