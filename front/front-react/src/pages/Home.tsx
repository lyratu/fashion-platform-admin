import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import 'daisyui/dist/full.css'

function Home() {
  // 精选穿搭数据
  const featuredOutfits = [
    {
      id: 1,
      image: 'https://picsum.photos/seed/outfit1/400/300',
      title: '春季休闲搭配指南',
      description: '轻松驾驭春季休闲风，打造清新自然的个人风格',
      author: {
        name: '时尚达人',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
      },
      publishDate: '2024-03-20'
    },
    {
      id: 2,
      image: 'https://picsum.photos/seed/outfit2/400/300',
      title: '职场穿搭技巧',
      description: '专业大方的职场着装，提升个人魅力',
      author: {
        name: '造型师Lucy',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucy'
      },
      publishDate: '2024-03-20'
    },
    {
      id: 3,
      image: 'https://picsum.photos/seed/outfit3/400/300',
      title: '约会穿搭推荐',
      description: '甜美可爱的约会装扮，展现最佳状态',
      author: {
        name: '搭配专家',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma'
      },
      publishDate: '2024-03-20'
    }
  ]

  // 热销商品数据
  const hotProducts = [
    {
      id: 1,
      image: 'https://picsum.photos/seed/product1/400/300',
      title: '春季新款连衣裙',
      price: 299
    },
    {
      id: 2,
      image: 'https://picsum.photos/seed/product2/400/300',
      title: '时尚休闲西装',
      price: 599
    },
    {
      id: 3,
      image: 'https://picsum.photos/seed/product3/400/300',
      title: '百搭牛仔外套',
      price: 399
    }
  ]

  return (
    <div>
      <nav className="navbar fixed inset-x-0 top-0 z-50 bg-base-100 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a className="btn btn-ghost text-xl normal-case">
              <img src={logo} alt="Logo" width={32} className="mr-2" />
              Dressing Community
            </a>
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/">首页</Link>
              </li>
              <li>
                <Link to="/outfits">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h18M3 3v18M3 3l18 18"
                    />
                  </svg>
                  穿搭分享
                </Link>
              </li>
              <li>
                <Link to="/shop">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h18M3 3v18M3 3l18 18"
                    />
                  </svg>
                  商城
                </Link>
              </li>
              <li>
                <Link to="/community">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h18M3 3v18M3 3l18 18"
                    />
                  </svg>
                  社区
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            <button className="btn btn-circle btn-ghost">
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
                  strokeWidth="2"
                  d="M3 3h18M3 3v18M3 3l18 18"
                />
              </svg>
            </button>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
                <div className="w-10 rounded-full">
                  <img src="https://via.placeholder.com/40" alt="User" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu-compact menu dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
              >
                <li>
                  <a>退出登录</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mx-auto">
        <div className="carousel mb-8 w-full">
          <div id="slide1" className="carousel-item relative w-full">
            <img
              src="https://picsum.photos/seed/carousel1/800/300"
              className="w-full"
              alt="Carousel 1"
            />
            <div className="absolute inset-x-5 top-1/2 flex -translate-y-1/2 justify-between">
              <a href="#slide3" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide2" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <img
              src="https://picsum.photos/seed/carousel2/800/300"
              className="w-full"
              alt="Carousel 2"
            />
            <div className="absolute inset-x-5 top-1/2 flex -translate-y-1/2 justify-between">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide3" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <img
              src="https://picsum.photos/seed/carousel3/800/300"
              className="w-full"
              alt="Carousel 3"
            />
            <div className="absolute inset-x-5 top-1/2 flex -translate-y-1/2 justify-between">
              <a href="#slide2" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>

        <h2 className="mb-4 text-2xl font-bold">精选穿搭</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredOutfits.map((outfit) => (
            <div key={outfit.id} className="card bg-base-100 shadow-md">
              <figure>
                <img src={outfit.image} alt={outfit.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{outfit.title}</h2>
                <p>{outfit.description}</p>
                <div className="mt-4 flex items-center">
                  <img
                    src={outfit.author.avatar}
                    alt={outfit.author.name}
                    className="mr-2 size-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold">
                      {outfit.author.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {outfit.publishDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mb-4 mt-8 text-2xl font-bold">热销商品</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hotProducts.map((product) => (
            <div key={product.id} className="card bg-base-100 shadow-md">
              <figure>
                <img src={product.image} alt={product.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.title}</h2>
                <p className="text-lg font-bold text-primary">
                  ¥{product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
