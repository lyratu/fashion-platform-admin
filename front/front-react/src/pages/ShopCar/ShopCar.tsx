import React, { useState } from 'react';

const ShopCar: React.FC = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: 'https://img.alicdn.com/imgextra/i1/6000000007721/O1CN01z8W8aT1CzQzZ5QJ8m_!!6000000007721-0-tbvideo.jpg',
      title: '春季新款连衣裙',
      price: 299,
      quantity: 1,
    },
    {
      id: 2,
      image: 'https://img.alicdn.com/imgextra/i4/6000000007721/O1CN01z8W8aT1CzQzZ5QJ8m_!!6000000007721-0-tbvideo.jpg',
      title: '时尚休闲西装',
      price: 599,
      quantity: 1,
    },
    {
      id: 3,
      image: 'https://img.alicdn.com/imgextra/i3/6000000007721/O1CN01z8W8aT1CzQzZ5QJ8m_!!6000000007721-0-tbvideo.jpg',
      title: '百搭牛仔外套',
      price: 399,
      quantity: 1,
    },
  ]);

  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">购物车</h2>
      <div className="bg-white p-4 rounded shadow">
        {cartItems.length === 0 ? (
          <p className="text-center">购物车为空</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center mb-4">
                <img src={item.image} alt={item.title} className="w-24 h-24 rounded mr-4" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-gray-500">价格: ¥{item.price}</p>
                  <div className="flex items-center mt-2">
                    <label className="mr-2">数量:</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                      className="input input-bordered w-20"
                      min="1"
                    />
                  </div>
                </div>
                <button className="btn btn-ghost btn-xs" onClick={() => handleRemoveItem(item.id)}>
                  移除
                </button>
              </div>
            ))}
            <hr className="my-4" />
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">总价: ¥{totalPrice}</h3>
              <button className="btn btn-primary">去结算</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopCar;
