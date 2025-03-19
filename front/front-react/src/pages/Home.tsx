import React, { useEffect, useState } from 'react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useNavigate } from 'react-router-dom'
import { homeApi } from '@/api/home'

function Home() {
  const navigate = useNavigate()
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
    },
    {
      id: 4,
      image: 'https://picsum.photos/seed/product3/400/300',
      title: '百搭牛仔外套',
      price: 399
    }
  ]
  const [carousels, setCarousels] = useState([])
  const getInfo = async () => {
    const data = await homeApi.getHomeInfo()
    setCarousels(data)
  }
  useEffect(() => {
    getInfo()
  }, [])
  return (
    <div className="container mx-auto py-4 px-16">
      <div className="carousel rounded-box mb-8 w-full">
        <Swiper
          pagination={{
            dynamicBullets: true
          }}
          loop={true}
          navigation={true}
          autoplay={true}
          modules={[Pagination, Navigation, Autoplay]}
        >
          {carousels.map((item: any, index) => (
            <SwiperSlide key={item.id}>
              <img
                src={item.CarouselImg}
                className="w-auto aspect-[5/2] object-cover cursor-pointer"
                alt="网络错误，未获取到图片"
              />
              <div className="carousel-content">
                <h1 className="text-2xl font-bold cursor-pointer mb-2">
                  {item.title}
                </h1>
                <p className="text-sm cursor-pointer">{item.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div>
        <h2 className="mb-4 text-2xl font-bold">精选穿搭</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredOutfits.map((outfit) => (
            <div
              key={outfit.id}
              className="card cursor-pointer card-xs shadow-sm"
              onClick={() => navigate(`/outfits/${outfit.id}`)}
            >
              <figure>
                <img src={outfit.image} alt={outfit.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title truncate">{outfit.title}</h2>
                <p className="line-clamp-2">{outfit.description}</p>
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {hotProducts.map((product) => (
            <div key={product.id} className="card card-xs shadow-sm">
              <figure>
                <img src={product.image} alt={product.title} />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title cursor-pointer">{product.title}</h2>
                <p className="text-sm font-bold text-pink-500">
                  ¥{product.price}
                </p>
                <button className="btn btn-sm btn-primary mt-2 text-white">
                  加入购物车
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <footer className="footer footer-center bg-base-200 text-base-content mt-10 rounded p-10">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">关于我们</a>
          <a className="link link-hover">联系我们</a>
          <a className="link link-hover">社区</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">123</div>
        </nav>
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - 版权所有lyratu有限责任公司
          </p>
        </aside>
      </footer> */}
    </div>
  )
}

export default Home
