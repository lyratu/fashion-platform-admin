import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import OutfitCard from '../components/OutfitCard'
import ProductCard from '../components/ProductCard'

function Home() {
  // 轮播图数据
  const carouselImages = [
    {
      src: 'https://picsum.photos/seed/banner1/1600/500',
      alt: 'banner 1'
    },
    {
      src: 'https://picsum.photos/seed/banner2/1600/500',
      alt: 'banner 2'
    },
    {
      src: 'https://picsum.photos/seed/banner3/1600/500',
      alt: 'banner 3'
    }
  ]

  // 精选穿搭数据
  const featuredOutfits = [
    {
      id: 1,
      image: 'https://picsum.photos/seed/outfit1/400/300',
      title: '春季休闲搭配指南',
      description:
        '轻松驾驭春季休闲风，打造清新自然的个人风格轻松驾驭春季休闲风，打造清新自然的个人风格轻松驾驭春季休闲风，打造清新自然的个人风格',
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f7f8fc' }}>
      <Navbar />
      <div className="h-16"></div>

      <div className="pb-8">
        {/* 轮播图 */}
        <div className="container mx-auto px-4 pt-4">
          <Carousel images={carouselImages} />
        </div>

        <div className="container mx-auto px-4">
          {/* 精选穿搭 */}
          <div className="my-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">精选穿搭</h2>
              <Link to="/outfits" className="btn btn-link">
                查看更多 →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {featuredOutfits.map((outfit) => (
                <OutfitCard key={outfit.id} {...outfit} />
              ))}
            </div>
          </div>

          {/* 热销商品 */}
          <div className="my-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">热销商品</h2>
              <Link to="/shop" className="btn btn-link">
                查看更多 →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {hotProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
