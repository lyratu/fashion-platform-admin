type ToastType = 'success' | 'error' | 'info' | 'warning'

export const showToast = (content: string, type: ToastType) => {
  // 创建toast元素
  const toast = document.createElement('div')
  toast.className = `toast toast-top toast-center`

  const alert = document.createElement('div')
  alert.className = `alert alert-${type}`
  alert.textContent = content

  toast.appendChild(alert)
  document.body.appendChild(toast)

  // 3秒后移除
  setTimeout(() => {
    document.body.removeChild(toast)
  }, 3000)
}
