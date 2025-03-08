import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ShopCar: React.FC = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image:
        'https://img.alicdn.com/imgextra/i1/6000000007721/O1CN01z8W8aT1CzQzZ5QJ8m_!!6000000007721-0-tbvideo.jpg',
      title: '春季新款连衣裙',
      price: 299,
      quantity: 1,
      selected: true
    },
    // ... 其他商品保持不变，但添加 selected 属性
    {
      id: 2,
      image:
        'https://img.alicdn.com/imgextra/i4/6000000007721/O1CN01z8W8aT1CzQzZ5QJ8m_!!6000000007721-0-tbvideo.jpg',
      title: '时尚休闲西装',
      price: 599,
      quantity: 1,
      selected: true
    },
    {
      id: 3,
      image:
        'https://img.alicdn.com/imgextra/i3/6000000007721/O1CN01z8W8aT1CzQzZ5QJ8m_!!6000000007721-0-tbvideo.jpg',
      title: '百搭牛仔外套',
      price: 399,
      quantity: 1,
      selected: true
    }
  ])

  const [allSelected, setAllSelected] = useState(true)

  // 监听商品选择状态变化，更新全选状态
  useEffect(() => {
    setAllSelected(
      cartItems.length > 0 && cartItems.every((item) => item.selected)
    )
  }, [cartItems])

  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    )
  }

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  // 切换单个商品的选择状态
  const toggleItemSelection = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    )
  }

  // 切换全选状态
  const toggleSelectAll = () => {
    const newSelectAllState = !allSelected
    setAllSelected(newSelectAllState)
    setCartItems((prevItems) =>
      prevItems.map((item) => ({ ...item, selected: newSelectAllState }))
    )
  }

  // 清空购物车
  const clearCart = () => {
    if (window.confirm('确定要清空购物车吗？')) {
      setCartItems([])
    }
  }

  // 计算选中商品的总价
  const totalPrice = cartItems
    .filter((item) => item.selected)
    .reduce((total, item) => total + item.price * item.quantity, 0)

  // 计算选中的商品数量
  const selectedItemsCount = cartItems.filter((item) => item.selected).length

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-2xl font-bold">购物车</h2>
      <div className="rounded bg-white p-4 shadow">
        {cartItems.length === 0 ? (
          <div className="py-8 text-center">
            <p className="mb-4 text-gray-500">购物车为空</p>
            <Link to="/" className="btn btn-primary">
              去购物
            </Link>
          </div>
        ) : (
          <div>
            <div className="mb-4 flex items-center border-b pb-2">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleSelectAll}
                className="checkbox mr-2"
              />
              <span className="font-medium">全选</span>
              <button
                className="ml-auto text-red-500 hover:text-red-700"
                onClick={clearCart}
              >
                清空购物车
              </button>
            </div>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="mb-4 flex items-center border-b pb-4"
              >
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => toggleItemSelection(item.id)}
                  className="checkbox mr-2"
                />
                <img
                  src={item.image}
                  alt={item.title}
                  className="mr-4 size-24 rounded object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="font-medium text-red-500">¥{item.price}</p>
                  <div className="mt-2 flex items-center">
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, Number(e.target.value))
                      }
                      className="input input-bordered mx-2 w-16 text-center"
                      min="1"
                    />
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="mb-2 font-bold">
                    ¥{item.price * item.quantity}
                  </p>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    删除
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 rounded bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span>
                    已选择{' '}
                    <span className="font-bold text-red-500">
                      {selectedItemsCount}
                    </span>{' '}
                    件商品
                  </span>
                </div>
                <div className="text-right">
                  <p className="mb-2">
                    合计:{' '}
                    <span className="text-xl font-bold text-red-500">
                      ¥{totalPrice}
                    </span>
                  </p>
                  <button
                    className="btn btn-primary"
                    disabled={selectedItemsCount === 0}
                  >
                    去结算({selectedItemsCount})
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShopCar
