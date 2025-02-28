import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { TiArrowLeft } from 'react-icons/ti'
import { FaThumbsUp, FaReply } from 'react-icons/fa'

const OutfitDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const outfit = {
    id: 1,
    image: 'https://picsum.photos/seed/outfit1/400/300',
    title: '春季休闲搭配指南',
    description: '轻松驾驭春季休闲风，打造清新自然的个人风格',
    author: {
      name: '时尚达人',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    },
    publishDate: '2024-03-20',
    views: 1234,
    content: '<p>这是一个详细的穿搭指南，包含了各种搭配技巧和建议。</p>'
  }

  const recommendations = [
    {
      id: 2,
      image: 'https://picsum.photos/seed/outfit2/400/300',
      title: '职场穿搭技巧'
    },
    {
      id: 3,
      image: 'https://picsum.photos/seed/outfit3/400/300',
      title: '约会穿搭推荐'
    },
    {
      id: 4,
      image: 'https://picsum.photos/seed/outfit4/400/300',
      title: '夏季清凉搭配'
    }
  ]

  const initialComments = [
    {
      id: 1,
      author: '用户A',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=UserA',
      content: '这篇文章非常有帮助！',
      date: '2024-03-21',
      likes: 10,
      replies: [
        {
          id: 11,
          author: '用户C',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=UserC',
          content: '确实如此！',
          date: '2024-03-22',
          likes: 2
        }
      ]
    },
    {
      id: 2,
      author: '用户B',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=UserB',
      content: '感谢分享！',
      date: '2024-03-22',
      likes: 5,
      replies: []
    }
  ]

  const [comments, setComments] = useState(initialComments)
  const [replyTo, setReplyTo] = useState<{
    commentId: number
    author: string
  } | null>(null)
  const [commentContent, setCommentContent] = useState('')

  const handleLike = (commentId: number, replyId?: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          if (replyId) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId
                  ? { ...reply, likes: reply.likes + 1 }
                  : reply
              )
            }
          } else {
            return { ...comment, likes: comment.likes + 1 }
          }
        }
        return comment
      })
    )
  }

  const handleReply = (commentId: number, author: string) => {
    setReplyTo({ commentId, author })
  }

  const handleReset = () => {
    setReplyTo(null)
    setCommentContent('')
  }

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
                  avatar:
                    'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
                  content: commentContent,
                  date: new Date().toISOString().split('T')[0],
                  likes: 0
                }
              ]
            }
          }
          return comment
        })
      )
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
          replies: []
        }
      ])
    }
    handleReset()
  }

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row">
      <div className="lg:w-2/3 bg-base-100 p-6 rounded-lg shadow-md">
        <button
          className="btn btn-ghost btn-sm mb-4"
          onClick={() => window.history.back()}
        >
          <TiArrowLeft className=" size-6" />
          返回
        </button>
        <div className="flex items-center mb-4">
          <img
            src={outfit.author.avatar}
            alt={outfit.author.name}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <p className="text-lg font-semibold">{outfit.author.name}</p>
            <p className="text-sm text-gray-500">{outfit.publishDate}</p>
          </div>
        </div>
        <hr className="mb-4 border-t border-gray-200 w-full" />
        <h1 className="text-3xl font-bold mb-2">{outfit.title}</h1>
        <div className="flex items-center mb-4">
          <span className="text-gray-500 mr-4">浏览次数: {outfit.views}</span>
          <button className="btn btn-outline btn-sm">分享</button>
        </div>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: outfit.content }}
        ></div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">评论</h2>
          <p className="mb-4">评论数量: {comments.length}</p>
          {replyTo && (
            <div className="mb-2 text-sm text-gray-500">
              回复用户 {replyTo.author}:
            </div>
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
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div className="mr-2">
                    <p className="font-semibold">{comment.author}</p>
                    <p className="text-xs text-gray-500">{comment.date}</p>
                  </div>
                </div>
                <p>{comment.content}</p>
                <div className="flex items-center mt-2">
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => handleLike(comment.id)}
                  >
                    <FaThumbsUp className="mr-1" /> {comment.likes}
                  </button>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => handleReply(comment.id, comment.author)}
                  >
                    <FaReply className="mr-1" /> 回复
                  </button>
                </div>
                <div className="ml-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="mb-2">
                      <div className="flex items-center mb-1">
                        <img
                          src={reply.avatar}
                          alt={reply.author}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div className="mr-2">
                          <p className="font-semibold">{reply.author}</p>
                          <p className="text-xs text-gray-500">{reply.date}</p>
                        </div>
                      </div>
                      <p>{reply.content}</p>
                      <div className="flex items-center mt-2">
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => handleLike(comment.id, reply.id)}
                        >
                          <FaThumbsUp className="mr-1" /> {reply.likes}
                        </button>
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => handleReply(comment.id, reply.author)}
                        >
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
          {recommendations.map((rec) => (
            <div key={rec.id} className="card shadow-sm bg-white">
              <figure>
                <img src={rec.image} alt={rec.title} className="rounded-t-lg" />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{rec.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OutfitDetail
