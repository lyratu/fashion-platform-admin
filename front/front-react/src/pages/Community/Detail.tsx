import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TiArrowLeft } from 'react-icons/ti';
import { FaThumbsUp, FaReply } from 'react-icons/fa';

const CommunityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const article = {
    id: 1,
    author: {
      name: '作者1',
      avatar: 'https://via.placeholder.com/50',
    },
    publishDate: '2025-03-01',
    title: '文章标题1',
    content: '这是文章正文内容1...',
    image: 'https://via.placeholder.com/300',
  };

  const initialComments = [
    {
      id: 1,
      author: '用户A',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=UserA',
      content: '这篇文章非常有帮助！',
      date: '2025-03-02',
      likes: 10,
      replies: [
        {
          id: 11,
          author: '用户C',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=UserC',
          content: '确实如此！',
          date: '2025-03-03',
          likes: 2,
        },
      ],
    },
    {
      id: 2,
      author: '用户B',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=UserB',
      content: '感谢分享！',
      date: '2025-03-02',
      likes: 5,
      replies: [],
    },
  ];

  const [comments, setComments] = useState(initialComments);
  const [replyTo, setReplyTo] = useState<{ commentId: number; author: string } | null>(null);
  const [commentContent, setCommentContent] = useState('');

  const handleLike = (commentId: number, replyId?: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          if (replyId) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId ? { ...reply, likes: reply.likes + 1 } : reply
              ),
            };
          } else {
            return { ...comment, likes: comment.likes + 1 };
          }
        }
        return comment;
      })
    );
  };

  const handleReply = (commentId: number, author: string) => {
    setReplyTo({ commentId, author });
  };

  const handleReset = () => {
    setReplyTo(null);
    setCommentContent('');
  };

  const handleSubmit = () => {
    if (replyTo) {
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id === replyTo.commentId) {
            return {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: Date.now(),
                  author: '当前用户',
                  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
                  content: commentContent,
                  date: new Date().toISOString().split('T')[0],
                  likes: 0,
                },
              ],
            };
          }
          return comment;
        })
      );
    } else {
      setComments([
        ...comments,
        {
          id: Date.now(),
          author: '当前用户',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
          content: commentContent,
          date: new Date().toISOString().split('T')[0],
          likes: 0,
          replies: [],
        },
      ]);
    }
    handleReset();
  };

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row">
      <div className="lg:w-2/3 bg-base-100 p-6 rounded-lg shadow-md">
        <button className="btn btn-ghost btn-sm mb-4" onClick={() => window.history.back()}>
          <TiArrowLeft className="size-6" />
          返回
        </button>
        <div className="flex items-center mb-4">
          <img src={article.author.avatar} alt={article.author.name} className="w-12 h-12 rounded-full mr-4" />
          <div>
            <p className="text-lg font-semibold">{article.author.name}</p>
            <p className="text-sm text-gray-500">{article.publishDate}</p>
          </div>
        </div>
        <hr className="mb-4 border-t border-gray-200 w-full" />
        <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
        <img src={article.image} alt={article.title} className="w-full mb-4" />
        <p className="mb-4">{article.content}</p>
        <hr className="my-4" />
        <div className="flex space-x-4 mb-4">
          <button className="btn btn-outline btn-primary">收藏</button>
          <button className="btn btn-outline btn-secondary">点赞</button>
          <button className="btn btn-outline btn-accent">评论</button>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">评论</h2>
          <p className="mb-4">评论数量: {comments.length}</p>
          {replyTo && (
            <div className="mb-2 text-sm text-gray-500">回复用户 {replyTo.author}:</div>
          )}
          <div className="mb-4">
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="输入你的评论..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            ></textarea>
            <div className="flex justify-between mt-2">
              <button className="btn btn-primary" onClick={handleSubmit}>
                {replyTo ? '提交回复' : '提交评论'}
              </button>
              <button className="btn btn-secondary" onClick={handleReset}>
                重置
              </button>
            </div>
          </div>
          <div>
            {comments.map((comment) => (
              <div key={comment.id} className="mb-4">
                <hr className="my-2 border-t border-gray-200 w-full" />
                <div className="flex items-center mb-2">
                  <img src={comment.avatar} alt={comment.author} className="w-8 h-8 rounded-full mr-2" />
                  <div className="mr-2">
                    <p className="font-semibold">{comment.author}</p>
                    <p className="text-xs text-gray-500">{comment.date}</p>
                  </div>
                </div>
                <p>{comment.content}</p>
                <div className="flex items-center mt-2">
                  <button className="btn btn-ghost btn-xs" onClick={() => handleLike(comment.id)}>
                    <FaThumbsUp className="mr-1" /> {comment.likes}
                  </button>
                  <button className="btn btn-ghost btn-xs" onClick={() => handleReply(comment.id, comment.author)}>
                    <FaReply className="mr-1" /> 回复
                  </button>
                </div>
                <div className="ml-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="mb-2">
                      <div className="flex items-center mb-1">
                        <img src={reply.avatar} alt={reply.author} className="w-8 h-8 rounded-full mr-2" />
                        <div className="mr-2">
                          <p className="font-semibold">{reply.author}</p>
                          <p className="text-xs text-gray-500">{reply.date}</p>
                        </div>
                      </div>
                      <p>{reply.content}</p>
                      <div className="flex items-center mt-2">
                        <button className="btn btn-ghost btn-xs" onClick={() => handleLike(comment.id, reply.id)}>
                          <FaThumbsUp className="mr-1" /> {reply.likes}
                        </button>
                        <button className="btn btn-ghost btn-xs" onClick={() => handleReply(comment.id, reply.author)}>
                          <FaReply className="mr-1" /> 回复
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:w-1/3 lg:ml-4 mt-4 lg:mt-0">
        <h2 className="card text-xl font-bold bg-white mb-4 p-3">相关推荐</h2>
        <div className="grid gap-4">
          {/* Add recommended articles here */}
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;
