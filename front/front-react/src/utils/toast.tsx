import React from 'react'
import ReactDOM from 'react-dom'

type ToastType = 'success' | 'error' | 'info' | 'warning'

const Toast: React.FC<{ content: string; type: ToastType }> = ({ content, type }) => {
  return (
    <div className="toast toast-end">
      <div className={`alert alert-${type}`}>
        <span>{content}</span>
      </div>
    </div>
  )
}

export const showToast = (content: string, type: ToastType) => {
  // 创建容器元素
  const container = document.createElement('div')
  document.body.appendChild(container)

  // 渲染 Toast 组件
  ReactDOM.render(<Toast content={content} type={type} />, container)

  // 3秒后移除
  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(container)
    document.body.removeChild(container)
  }, 3000)
}
