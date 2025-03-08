import React, { useState, useEffect, useRef, DragEvent } from 'react'
import { showToast } from '../../utils/toast'
import { FaArrowRightFromBracket } from 'react-icons/fa6'
// 衣物类型定义
interface ClothingItem {
  id: string
  name: string
  type: 'top' | 'bottom' | 'shoes' | 'accessory'
  imageUrl: string
  season: 'spring' | 'summer' | 'autumn' | 'winter' | 'all'
  tags: string[]
}

// 天气信息类型
interface WeatherInfo {
  date: Date
  temperature: number
  condition: string
  icon: string
}

// 搭配类型
interface Outfit {
  id: string
  date: Date
  top?: ClothingItem
  bottom?: ClothingItem
  shoes?: ClothingItem
  accessories: ClothingItem[]
  note: string
}

const Wardrobe: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [weatherData, setWeatherData] = useState<WeatherInfo[]>([])
  const [isDIYMode, setIsDIYMode] = useState(false)
  const [currentOutfit, setCurrentOutfit] = useState<Outfit>({
    id: `outfit-${Date.now()}`,
    date: new Date(),
    accessories: [],
    note: ''
  })

  // 添加滚动容器的引用
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // 添加衣柜相关状态
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'top' | 'bottom' | 'shoes' | 'accessory'
  >('all')
  const [draggingItem, setDraggingItem] = useState<ClothingItem | null>(null)
  const [activeDrawer, setActiveDrawer] = useState<true | false>()

  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date
  })

  // 模拟获取天气数据
  useEffect(() => {
    const fetchWeatherData = async () => {
      const mockWeatherData: WeatherInfo[] = dates.map((date) => ({
        date,
        temperature: Math.floor(Math.random() * 15) + 15,
        condition: ['晴', '多云', '小雨', '阴'][Math.floor(Math.random() * 4)],
        icon: ['☀️', '⛅', '🌧️', '☁️'][Math.floor(Math.random() * 4)]
      }))
      setWeatherData(mockWeatherData)
    }

    fetchWeatherData()
  }, [])

  // 模拟获取衣物数据
  useEffect(() => {
    // 模拟API调用
    const mockClothingItems: ClothingItem[] = [
      {
        id: 't1',
        name: '白色T恤',
        type: 'top',
        imageUrl: 'https://via.placeholder.com/150?text=白色T恤',
        season: 'summer',
        tags: ['休闲', '基础款']
      },
      {
        id: 't2',
        name: '黑色衬衫',
        type: 'top',
        imageUrl: 'https://via.placeholder.com/150?text=黑色衬衫',
        season: 'all',
        tags: ['正式', '百搭']
      },
      {
        id: 't3',
        name: '蓝色卫衣',
        type: 'top',
        imageUrl: 'https://via.placeholder.com/150?text=蓝色卫衣',
        season: 'autumn',
        tags: ['休闲', '保暖']
      },
      {
        id: 't4',
        name: '条纹衬衫',
        type: 'top',
        imageUrl: 'https://via.placeholder.com/150?text=条纹衬衫',
        season: 'spring',
        tags: ['商务', '时尚']
      },
      {
        id: 'b1',
        name: '牛仔裤',
        type: 'bottom',
        imageUrl: 'https://via.placeholder.com/150?text=牛仔裤',
        season: 'all',
        tags: ['休闲', '百搭']
      },
      {
        id: 'b2',
        name: '黑色西裤',
        type: 'bottom',
        imageUrl: 'https://via.placeholder.com/150?text=黑色西裤',
        season: 'all',
        tags: ['正式', '商务']
      },
      {
        id: 'b3',
        name: '卡其短裤',
        type: 'bottom',
        imageUrl: 'https://via.placeholder.com/150?text=卡其短裤',
        season: 'summer',
        tags: ['休闲', '舒适']
      },
      {
        id: 'b4',
        name: '灰色运动裤',
        type: 'bottom',
        imageUrl: 'https://via.placeholder.com/150?text=灰色运动裤',
        season: 'all',
        tags: ['运动', '舒适']
      },
      {
        id: 's1',
        name: '白色运动鞋',
        type: 'shoes',
        imageUrl: 'https://via.placeholder.com/150?text=白色运动鞋',
        season: 'all',
        tags: ['休闲', '百搭']
      },
      {
        id: 's2',
        name: '黑色皮鞋',
        type: 'shoes',
        imageUrl: 'https://via.placeholder.com/150?text=黑色皮鞋',
        season: 'all',
        tags: ['正式', '商务']
      },
      {
        id: 's3',
        name: '棕色靴子',
        type: 'shoes',
        imageUrl: 'https://via.placeholder.com/150?text=棕色靴子',
        season: 'autumn',
        tags: ['休闲', '保暖']
      },
      {
        id: 'a1',
        name: '黑色腰带',
        type: 'accessory',
        imageUrl: 'https://via.placeholder.com/150?text=黑色腰带',
        season: 'all',
        tags: ['百搭', '基础款']
      },
      {
        id: 'a2',
        name: '银色项链',
        type: 'accessory',
        imageUrl: 'https://via.placeholder.com/150?text=银色项链',
        season: 'all',
        tags: ['时尚', '点缀']
      },
      {
        id: 'a3',
        name: '棒球帽',
        type: 'accessory',
        imageUrl: 'https://via.placeholder.com/150?text=棒球帽',
        season: 'all',
        tags: ['休闲', '运动']
      }
    ]
    setClothingItems(mockClothingItems)
  }, [])

  // 添加鼠标滚轮事件处理
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollContainerRef.current) {
        e.preventDefault()
        // 减小滚动速度，使滚动更平滑
        scrollContainerRef.current.scrollLeft += e.deltaY * 0.5
      }
    }

    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', handleWheel)
      }
    }
  }, [])

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  }

  const handleDIYMode = () => {
    setIsDIYMode(true)
  }

  const handleAutoRecommend = () => {
    showToast('正在为您智能推荐搭配...', 'info')
    // TODO: 实现智能推荐逻辑
  }

  const getCurrentWeather = () => {
    return weatherData.find(
      (w) => w.date.toDateString() === selectedDate.toDateString()
    )
  }



  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.add('bg-blue-50')
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('bg-blue-50')
  }


  // 移除已选择的衣物
  const handleRemoveItem = (
    type: 'top' | 'bottom' | 'shoes',
    itemId: string
  ) => {
    setCurrentOutfit((prev) => ({
      ...prev,
      [type]: undefined
    }))
  }

  const handleRemoveAccessory = (itemId: string) => {
    setCurrentOutfit((prev) => ({
      ...prev,
      accessories: prev.accessories.filter((a) => a.id !== itemId)
    }))
  }

  // 切换抽屉
  const toggleDrawer = () => {
    setActiveDrawer(!activeDrawer)
    handleDIYMode()
    // 确保在切换抽屉时不会丢失拖拽状态
    setTimeout(() => {
      setDraggingItem(null)
    }, 100)
  }

  // 修改拖拽相关处理函数
  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    item: ClothingItem
  ) => {
    setDraggingItem(item)
    e.dataTransfer.setData('text/plain', item.id)
    e.dataTransfer.setData('application/json', JSON.stringify(item))

    // 创建自定义拖拽图像
    const dragImage = new Image()
    dragImage.src = item.imageUrl
    dragImage.style.width = '60px'
    dragImage.style.height = '60px'
    dragImage.style.opacity = '0.7'
    document.body.appendChild(dragImage)
    e.dataTransfer.setDragImage(dragImage, 30, 30)

    // 延迟移除拖拽图像
    setTimeout(() => {
      document.body.removeChild(dragImage)
    }, 0)
  }

  const handleDrop = (
    e: DragEvent<HTMLDivElement>,
    dropZone: 'top' | 'bottom' | 'shoes' | 'accessory'
  ) => {
    e.preventDefault()
    e.currentTarget.classList.remove('bg-blue-50')

    // 从事件中获取拖拽的衣物数据
    const itemId = e.dataTransfer.getData('text/plain')
    let item = draggingItem

    // 如果draggingItem为null，尝试从dataTransfer中获取
    if (!item) {
      try {
        const itemJson = e.dataTransfer.getData('application/json')
        if (itemJson) {
          item = JSON.parse(itemJson) as ClothingItem
        } else {
          // 如果没有JSON数据，尝试从clothingItems中查找
          item = clothingItems.find(i => i.id === itemId) || null
        }
      } catch (error) {
        console.error('解析拖拽数据失败', error)
      }
    }

    if (!item) {
      showToast('拖拽失败，请重试', 'error')
      return
    }

    // 检查拖拽的衣物类型是否与放置区域匹配
    if (item.type !== dropZone) {
      showToast(
        `这件衣物不能放在${
          dropZone === 'top'
            ? '上衣'
            : dropZone === 'bottom'
              ? '裤子'
              : dropZone === 'shoes'
                ? '鞋子'
                : '配饰'
        }区域`,
        'error'
      )
      return
    }

    // 更新当前搭配
    if (dropZone === 'accessory') {
      // 配饰可以有多个
      if (!currentOutfit.accessories.some((a) => a.id === item!.id)) {
        setCurrentOutfit((prev) => ({
          ...prev,
          accessories: [...prev.accessories, item!]
        }))
      }
    } else {
      // 其他类型只能有一个
      setCurrentOutfit((prev) => ({
        ...prev,
        [dropZone]: item
      }))
    }

    setDraggingItem(null)
  }

  // 过滤衣物
  const filteredClothingItems = clothingItems.filter(
    (item) => selectedCategory === 'all' || item.type === selectedCategory
  )

  return (
    <div className="container mx-auto p-4 flex flex-col">
      {/* 现有的DIY区域和右侧面板 */}
      <div className="flex flex-col lg:flex-row mb-8">
        <div className="lg:w-3/4 bg-base-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">穿搭DIY区</h2>
          {isDIYMode ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 左侧：搭配预览区 */}
              <div className="bg-gray-50 p-4 rounded-lg z-10">
                <h3 className="text-lg font-bold mb-4">搭配预览</h3>
                <div className="flex flex-col items-center">
                  {/* 上衣放置区 */}
                  <div
                    className="w-full h-40 mb-4 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-white"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'top')}
                  >
                    {currentOutfit.top ? (
                      <div className="relative w-full h-full p-2">
                        <img
                          src={currentOutfit.top.imageUrl}
                          alt={currentOutfit.top.name}
                          className="h-full object-contain mx-auto"
                        />
                        <button
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          onClick={() =>
                            handleRemoveItem('top', currentOutfit.top!.id)
                          }
                        >
                          ×
                        </button>
                        <p className="text-center mt-1">
                          {currentOutfit.top.name}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-400">拖拽上衣到这里</p>
                    )}
                  </div>

                  {/* 裤子放置区 */}
                  <div
                    className="w-full h-40 mb-4 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-white"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'bottom')}
                  >
                    {currentOutfit.bottom ? (
                      <div className="relative w-full h-full p-2">
                        <img
                          src={currentOutfit.bottom.imageUrl}
                          alt={currentOutfit.bottom.name}
                          className="h-full object-contain mx-auto"
                        />
                        <button
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          onClick={() =>
                            handleRemoveItem('bottom', currentOutfit.bottom!.id)
                          }
                        >
                          ×
                        </button>
                        <p className="text-center mt-1">
                          {currentOutfit.bottom.name}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-400">拖拽裤子到这里</p>
                    )}
                  </div>

                  {/* 鞋子放置区 */}
                  <div
                    className="w-full h-40 mb-4 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-white"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'shoes')}
                  >
                    {currentOutfit.shoes ? (
                      <div className="relative w-full h-full p-2">
                        <img
                          src={currentOutfit.shoes.imageUrl}
                          alt={currentOutfit.shoes.name}
                          className="h-full object-contain mx-auto"
                        />
                        <button
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          onClick={() =>
                            handleRemoveItem('shoes', currentOutfit.shoes!.id)
                          }
                        >
                          ×
                        </button>
                        <p className="text-center mt-1">
                          {currentOutfit.shoes.name}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-400">拖拽鞋子到这里</p>
                    )}
                  </div>

                  {/* 配饰放置区 */}
                  <div
                    className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-wrap items-center justify-center bg-white"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'accessory')}
                  >
                    {currentOutfit.accessories.length > 0 ? (
                      <div className="flex flex-wrap justify-center gap-2 p-2 w-full">
                        {currentOutfit.accessories.map((accessory) => (
                          <div
                            key={accessory.id}
                            className="relative w-24 h-24"
                          >
                            <img
                              src={accessory.imageUrl}
                              alt={accessory.name}
                              className="h-full object-contain mx-auto"
                            />
                            <button
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                              onClick={() =>
                                handleRemoveAccessory(accessory.id)
                              }
                            >
                              ×
                            </button>
                            <p className="text-center text-xs mt-1">
                              {accessory.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400">拖拽配饰到这里</p>
                    )}
                  </div>
                </div>
              </div>

              {/* 右侧：搭配信息区 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-4">搭配信息</h3>
                <div className="mb-4">
                  <p className="text-gray-700 mb-2">
                    日期：{selectedDate.toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 mb-2">
                    天气：{getCurrentWeather()?.icon}{' '}
                    {getCurrentWeather()?.condition}{' '}
                    {getCurrentWeather()?.temperature}°C
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">搭配笔记：</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={4}
                    placeholder="记录一下这套搭配的灵感..."
                    value={currentOutfit.note}
                    onChange={(e) =>
                      setCurrentOutfit((prev) => ({
                        ...prev,
                        note: e.target.value
                      }))
                    }
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    className="btn btn-primary flex-1"
                    onClick={() => {
                      // 保存搭配逻辑
                      showToast('搭配已保存', 'success')
                    }}
                  >
                    保存搭配
                  </button>
                  <button
                    className="btn btn-outline flex-1"
                    onClick={() => {
                      // 重置搭配
                      setCurrentOutfit({
                        id: `outfit-${Date.now()}`,
                        date: selectedDate,
                        accessories: [],
                        note: ''
                      })
                    }}
                  >
                    重置
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">
                请选择"帮我搭配"或"搭配DIY"开始使用
              </p>
            </div>
          )}
        </div>
        <div className="lg:w-1/4 lg:ml-4 mt-4 lg:mt-0">
          {/* 恢复右侧面板内容 */}
          <div className="bg-white p-4 rounded shadow mb-4">
            <button
              className="btn btn-primary w-full mb-2"
              onClick={handleAutoRecommend}
            >
              帮我搭配
            </button>

            {/* 我的衣柜模块 */}
            <div className="drawer drawer-end">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
                checked={activeDrawer}
              />
              <div className="drawer-content">
                {/* Page content here */}
                <label
                  htmlFor="my-drawer-4"
                  className="drawer-button btn btn-secondary w-full"
                  onClick={toggleDrawer}
                >
                  搭配DIY
                </label>
              </div>
              <div className="drawer-side">
                <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-8 rounded-xl shadow-2xl mb-8 w-1/2">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                    <FaArrowRightFromBracket
                      className="mr-4 cursor-pointer"
                      onClick={toggleDrawer}
                    />
                    我的衣柜
                  </h2>

                  {/* 衣柜分类标签 */}
                  <div className="flex space-x-4 mb-6 overflow-x-auto pb-2 custom-scrollbar">
                    {['全部', '上衣', '裤子', '鞋子', '配饰'].map(
                      (category, index) => (
                        <button
                          key={category}
                          onClick={() =>
                            setSelectedCategory(
                              index === 0
                                ? 'all'
                                : index === 1
                                  ? 'top'
                                  : index === 2
                                    ? 'bottom'
                                    : index === 3
                                      ? 'shoes'
                                      : 'accessory'
                            )
                          }
                          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300
                ${
                  selectedCategory ===
                  (index === 0
                    ? 'all'
                    : index === 1
                      ? 'top'
                      : index === 2
                        ? 'bottom'
                        : index === 3
                          ? 'shoes'
                          : 'accessory')
                    ? 'bg-white text-blue-600 shadow-lg transform -translate-y-1'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
                        >
                          {category}
                        </button>
                      )
                    )}
                  </div>

                  {/* 衣柜内容区 - 拟态设计风格 */}
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-4">
                    {filteredClothingItems.map((item) => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item)}
                        className="group relative bg-white p-4 rounded-xl custom-wardrobe-item
                transition-all duration-300 transform hover:-translate-y-1 cursor-move"
                      >
                        <div className="relative w-full pb-[100%] mb-3 overflow-hidden rounded-lg">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <h3 className="text-sm font-medium text-gray-800 mb-1">
                          {item.name}
                        </h3>
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
                          <span className="text-xs text-blue-600 font-medium">
                            拖拽到搭配区
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-xl font-bold mb-4">今日穿搭</h2>
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto space-x-4 pb-2 custom-scrollbar"
              style={{
                scrollBehavior: 'smooth',
                scrollbarWidth: 'thin',
                msOverflowStyle: 'none'
              }}
            >
              {dates.map((date) => {
                const weather = weatherData.find(
                  (w) => w.date.toDateString() === date.toDateString()
                )
                return (
                  <div
                    key={date.toISOString()}
                    className={`p-4 rounded-lg shadow cursor-pointer min-w-[100px] transition-all duration-200 hover:shadow-md ${
                      selectedDate.toDateString() === date.toDateString()
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    onClick={() => handleDateChange(date)}
                  >
                    <p className="text-center">{date.getDate()}</p>
                    <p className="text-center text-sm">
                      {date.toLocaleDateString('zh-CN', { weekday: 'short' })}
                    </p>
                    <p className="text-center text-sm">
                      {weather
                        ? `${weather.icon} ${weather.temperature}°C`
                        : '加载中...'}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-4">搭配详情</h2>
            <div className="text-gray-600">
              <p>日期：{selectedDate.toLocaleDateString()}</p>
              <p>天气：{getCurrentWeather()?.condition || '加载中...'}</p>
              <p>温度：{getCurrentWeather()?.temperature || '--'}°C</p>
            </div>
          </div>
        </div>
      </div>

      {/* 添加自定义样式 */}
      <style jsx>{`
        .custom-wardrobe-item {
          box-shadow:
            8px 8px 15px rgba(0, 0, 0, 0.1),
            -8px -8px 15px rgba(255, 255, 255, 0.5);
        }

        .custom-wardrobe-item:hover {
          box-shadow:
            12px 12px 20px rgba(0, 0, 0, 0.15),
            -12px -12px 20px rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </div>
  )
}

// 添加自定义滚动条样式
const customScrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    height: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

// 将自定义样式添加到文档头部
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = customScrollbarStyles
  document.head.appendChild(styleElement)
}

export default Wardrobe
