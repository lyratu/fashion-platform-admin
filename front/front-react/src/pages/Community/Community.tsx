import React from 'react';
import { Link } from 'react-router-dom';

const Community: React.FC = () => {
  const articles = [
    {
      id: 1,
      authorImage: 'https://via.placeholder.com/50',
      authorName: '作者1',
      publishDate: '2025-03-01',
      title: '文章标题1',
      content: '这是文章正文内容1...',
      image: 'https://via.placeholder.com/300',
    },
    // Add more articles here
  ];

  const commentsRanking = [
    { id: 1, title: '评论标题1', commentsCount: 10 },
    { id: 2, title: '评论标题2', commentsCount: 8 },
    // Add more rankings here
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 bg-white p-4 rounded shadow flex items-center">
        <input
          type="text"
          placeholder="搜索文章"
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
      <div className="flex">
        <div className="w-2/3 pr-4">
          {articles.map((article) => (
            <Link to={`/community/${article.id}`} key={article.id} className="bg-white p-4 rounded shadow mb-4 block">
              <div className="flex items-center mb-4">
                <img
                  src={article.authorImage}
                  alt={article.authorName}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-bold">{article.authorName}</p>
                  <p className="text-gray-500">{article.publishDate}</p>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2">{article.title}</h2>
              <p className="mb-4">{article.content}</p>
              <img
                src={article.image}
                alt={article.title}
                className="w-full mb-4"
              />
              <hr className="my-2 border-t border-gray-200 w-full" />
              <div className="flex space-x-4">
                <button className="btn btn-outline btn-primary">收藏</button>
                <button className="btn btn-outline btn-secondary">点赞</button>
                <button className="btn btn-outline btn-accent">评论</button>
              </div>
            </Link>
          ))}
        </div>
        <div className="w-1/3">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-4">评论榜</h2>
            {commentsRanking.map((item, index) => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <span className="font-bold">{index + 1}</span>
                <span className="flex-1 ml-2">{item.title}</span>
                <span className="text-gray-500">{item.commentsCount} 评论</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
