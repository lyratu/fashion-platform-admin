import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { FaHome, FaAtom } from 'react-icons/fa'
import { LuSofa } from 'react-icons/lu'
import { MdBreakfastDining } from 'react-icons/md'
import { GiFairyWings } from 'react-icons/gi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { GiClothes } from 'react-icons/gi'
import { userApi } from '@/api/user'
import { outfitsApi } from '@/api/outfits'
const Navbar = () => {
  const navigate = useNavigate()
  const exitLogin = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  const getInfo = async () => {
    const data = await outfitsApi.getOutfitsList()
    console.log(data)
  }
  return (
    <nav className="navbar bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <a className="btn btn-ghost text-xl normal-case">
            <GiFairyWings className=" size-8" />
            时尚穿搭交流平台
          </a>
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <FaHome className=" size-5" />
                首页
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/outfits"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <FaAtom className=" size-5" />
                穿搭分享
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <MdBreakfastDining className=" size-5" />
                商城
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/community"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <LuSofa className=" size-5" />
                社区
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Wardrobe"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <GiClothes className=" size-5" />
                衣橱
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            className="btn btn-circle btn-ghost"
            title="Shopping Cart"
            to={'/shopcar'}
          >
            <AiOutlineShoppingCart className=" size-5" />
          </Link>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
              <div className="w-10 rounded-full">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
                  alt="User"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu-compact menu dropdown-content rounded-box bg-base-100 z-50 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a onClick={getInfo}>个人信息</a>
              </li>
              <li>
                <a onClick={exitLogin}>退出登录</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
