import React from 'react'
import { Link } from 'react-router-dom'

const Outfits: React.FC = () => {
  const outfits = [
    {
      id: 1,
      image: 'https://picsum.photos/seed/outfit1/400/300',
      title: '春季休闲搭配指南',
      description: '轻松驾驭春季休闲风，打造清新自然的个人风格',
      author: {
        name: '时尚达人',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
      },
      publishDate: '2024-03-20',
      views: 1234
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
      publishDate: '2024-03-20',
      views: 5678
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
      publishDate: '2024-03-20',
      views: 91011
    }
  ]

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <select className="select select-bordered">
        <option disabled selected>选择类别</option>
        <option>运动风</option>
        <option>休闲</option>
        <option>职场</option>
        <option>约会</option>
          </select>
          <select className="select select-bordered">
        <option disabled selected>选择季节</option>
        <option>春季</option>
        <option>夏季</option>
        <option>秋季</option>
        <option>冬季</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {outfits.map((outfit) => (
          <Link to={`/outfits/${outfit.id}`} key={outfit.id} className="card bg-base-100 shadow-md cursor-pointer">
        <figure className="relative">
          <img src={outfit.image} alt={outfit.title} />
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 text-sm">
            浏览次数: {outfit.views}
          </div>
        </figure>
        <div className="card-body">
          <h2 className="card-title truncate">{outfit.title}</h2>
          <p className="line-clamp-2">{outfit.description}</p>
          <div className="card-actions justify-between items-center mt-4">
            <div className="flex items-center">
          <img
            src={outfit.author.avatar}
            alt={outfit.author.name}
            className="w-10 h-10 rounded-full mr-2"
          />
          <div>
            <p className="text-sm font-semibold">{outfit.author.name}</p>
          </div>
            </div>
            <p className="text-xs text-gray-500">{outfit.publishDate}</p>
          </div>
        </div>
          </Link>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <div className="btn-group">
          <button className="btn">«</button>
          <button className="btn btn-active">1</button>
          <button className="btn ">2</button>
          <button className="btn">3</button>
          <button className="btn">»</button>
        </div>
      </div>
    </div>
  )
}

export default Outfits
