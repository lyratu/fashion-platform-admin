import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { errorConfigs } from '@/config/error'

const ErrorPage: React.FC = () => {
  const { code = '404' } = useParams<{ code: string }>()
  const navigate = useNavigate()

  const config = errorConfigs[code] || errorConfigs['404']

  const handleClick = () => {
    if (code === '401') {
      navigate('/login')
    } else {
      navigate('/')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-800">{config.title}</h1>
        <p className="mb-8 text-xl text-gray-600">{config.description}</p>
        <button
          onClick={handleClick}
          className="btn btn-primary"
        >
          {config.buttonText}
        </button>
      </div>
    </div>
  )
}

export default ErrorPage
