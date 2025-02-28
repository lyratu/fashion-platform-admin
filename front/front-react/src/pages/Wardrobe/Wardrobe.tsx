import React, { useState } from 'react';

const Wardrobe: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row">
      <div className="lg:w-3/4 bg-base-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">穿搭DIY区</h2>
        {/* DIY区内容 */}
      </div>
      <div className="lg:w-1/4 lg:ml-4 mt-4 lg:mt-0">
        <div className="bg-white p-4 rounded shadow mb-4">
          <button className="btn btn-primary w-full mb-2">帮我搭配</button>
          <button className="btn btn-secondary w-full">搭配DIY</button>
        </div>
        <div className="bg-white p-4 rounded shadow mb-4">
          <h2 className="text-xl font-bold mb-4">今日穿搭</h2>
          <div className="flex overflow-x-auto space-x-4">
            {dates.map((date) => (
              <div
                key={date.toISOString()}
                className={`p-4 rounded-lg shadow cursor-pointer ${
                  selectedDate.toDateString() === date.toDateString()
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100'
                }`}
                onClick={() => handleDateChange(date)}
              >
                <p className="text-center">{date.getDate()}</p>
                <p className="text-center text-sm">{date.toLocaleDateString('zh-CN', { weekday: 'short' })}</p>
                <p className="text-center text-sm">天气信息</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">对应的搭配面板</h2>
          {/* 对应的搭配面板内容 */}
        </div>
      </div>
    </div>
  );
};

export default Wardrobe;
