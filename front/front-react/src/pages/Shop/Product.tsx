import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Product: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const [quantity, setQuantity] = useState(1)
  const [tab, setTab] = useState('详情')

  const product = {
    id: 1,
    image:
      'https://th.bing.com/th?id=OIP.OaOYQFmR0wvNPzuBTPAW0gHaHa&w=119&h=104&c=7&bgcl=7eab65&r=0&o=6&pid=13.1',
    title: '时尚包包',
    price: 200,
    reviews: 150,
    stock: 20
  }

  useEffect(() => {
    // Fetch product details using productId
    // Example: fetchProductDetails(productId);
  }, [productId])

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value))
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="flex">
          <div className="w-1/2">
            <img src={product.image} alt={product.title} className="w-full" />
          </div>
          <div className="w-1/2 pl-4">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-xl text-pink-500 mb-2">${product.price}</p>
            <p className="mb-2">累计评价: {product.reviews}</p>
            <div className="mb-2">
              <label className="mr-2">数量:</label>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="input input-bordered w-20"
                min="1"
                max={product.stock}
              />
            </div>
            <p className="mb-4">库存件数: {product.stock}</p>
            <div className="flex mb-4">
              <button className="btn btn-primary mr-2">立即购买</button>
              <button className="btn btn-secondary">加入购物车</button>
            </div>
            <hr className="my-2 border-t border-gray-200 w-full" />

            <div className="flex space-x-4">
              <span className="badge badge-outline">正品保证</span>
              <span className="badge badge-outline">极速发货</span>
              <span className="badge badge-outline">7天无理由</span>
            </div>
          </div>
        </div>
      </div>
      <div role="tablist" className="tabs tabs-lifted">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="商品详情"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          Tab content 1
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="商品评价"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          Tab content 2
        </div>
      </div>
    </div>
  )
}

export default Product
