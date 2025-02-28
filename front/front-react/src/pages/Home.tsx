import { Link } from 'react-router-dom'
function Home() {
  // 轮播图数据

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

  return <div>123</div>
}

export default Home
