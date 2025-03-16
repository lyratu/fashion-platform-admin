import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { outfitsApi } from '@/api/outfits'
import { Outfit, OutfitDisplay } from '@/types/outfit'

const Outfits: React.FC = () => {
  const [list, setList] = useState<OutfitDisplay[]>([])

  const getList = async () => {
    try {
      const data = await outfitsApi.getOutfitsList()
      // 这里我们需要转换API返回的数据格式以匹配显示需求
      const displayData: OutfitDisplay[] = (data.list as Outfit[]).map(item => ({
        ...item,
        image: item.coverImage,
        views: item.viewNmber,
        publishDate: item.createTime.split(' ')[0],
        author: {
          name: `用户${item.authorId}`,  // 这里可能需要根据实际情况获取用户信息
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.authorId}`
        }
      }))
      setList(displayData)
    } catch (error) {
      console.error('获取搭配列表失败:', error)
    }
  }
  useEffect(() => {
    getList()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex space-x-4">
          <select className="select select-bordered">
            <option disabled selected>
              选择类别
            </option>
            <option>运动风</option>
            <option>休闲</option>
            <option>职场</option>
            <option>约会</option>
          </select>
          <select className="select select-bordered">
            <option disabled selected>
              选择季节
            </option>
            <option>春季</option>
            <option>夏季</option>
            <option>秋季</option>
            <option>冬季</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {list.map((outfit) => (
          <Link
            to={`/outfits/${outfit.id}`}
            key={outfit.id}
            className="card card-xs shadow-sm cursor-pointer "
          >
            <figure className="relative aspect-[1/1] w-full overflow-hidden">
              <img
                src={outfit.image}
                alt={outfit.title}
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 p-2 text-sm text-white">
                浏览次数: {outfit.views}
              </div>
            </figure>
            <div className="card-body">
              <h1 className="card-title truncate text-lg">{outfit.title}</h1>
              <p className="line-clamp-2">{outfit.description}</p>
              <div className="card-actions mt-4 items-center justify-between">
                <div className=" flex items-center">
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
