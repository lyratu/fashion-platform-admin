import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Shop: React.FC = () => {
  let navigate = useNavigate();
  const [category, setCategory] = useState('全部');
  const [priceRange, setPriceRange] = useState('全部');
  const [sortOption, setSortOption] = useState('默认');

  const categories = ['全部', '鞋子', '包包'];
  const priceRanges = ['全部', '0-100', '100-300'];
  const sortOptions = ['默认', '价格高低', '销量', '最新'];

  const products = [
    // Example product data
    {
      id: 1,
      category: '包包',
      title: '时尚包包',
      description: '高质量时尚包包',
      price: 200,
      sales: 150,
      image: 'https://th.bing.com/th?id=OIP.OaOYQFmR0wvNPzuBTPAW0gHaHa&w=119&h=104&c=7&bgcl=7eab65&r=0&o=6&pid=13.1'
    },
    // Add more products here
  ];

  const handleProductClick = (productId: number) => {
    navigate(`/shop/${productId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white">
        <div className="mb-4 p-4 rounded shadow flex items-center">
          <input
            type="text"
            placeholder="搜索商品"
            className="input input-bordered w-full"
          />
          <button className="btn btn-square btn-primary ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
        <div className="mb-4">
          <div role="tablist" className="tabs">
            {categories.map((cat) => (
              <a
                role="tab"
                key={cat}
                className={`tab ${category === cat ? 'tab-active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </a>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <div role="tablist" className="tabs">
            {priceRanges.map((range) => (
              <a
                role="tab"
                key={range}
                className={`tab ${priceRange === range ? 'tab-active' : ''}`}
                onClick={() => setPriceRange(range)}
              >
                {range}
              </a>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <div role="tablist" className="tabs">
            {sortOptions.map((option) => (
              <a
                role="tab"
                key={option}
                className={`tab ${sortOption === option ? 'tab-active' : ''}`}
                onClick={() => setSortOption(option)}
              >
                {option}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="card card-xs shadow-sm cursor-pointer"
            onClick={() => handleProductClick(product.id)}
          >
            <figure>
              <img src={product.image} alt={product.title} />
              <div className="badge badge-primary absolute top-0 left-0 m-2">
                {product.category}
              </div>
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.title}</h2>
              <p>{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-pink-500">${product.price}</span>
                <span>销量: {product.sales}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <div className="btn-group">
          <button className="btn">«</button>
          <button className="btn btn-active">1</button>
          <button className="btn">2</button>
          <button className="btn">3</button>
          <button className="btn">»</button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
