import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

// 创建axios实例
const instance = axios.create({
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 从localStorage获取token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const { data } = response
    // 根据后端接口规范判断请求是否成功
    if (data.code === 1000) {
      return data.data
    }
    // 如果不成功，统一抛出错误
    return Promise.reject(new Error(data.message || '请求失败'))
  },
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未登录或token过期
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          // 没有权限
          window.location.href = '/403'
          break
        case 404:
          // 请求不存在
          window.location.href = '/404'
          break
        case 500:
          // 服务器错误
          window.location.href = '/500'
          break
        default:
          console.error(`请求错误 ${error.response.status}: ${error.message}`)
      }
    } else {
      // 请求超时或者网络错误
      console.error('网络错误或请求超时')
    }
    return Promise.reject(error)
  }
)

// 封装GET请求
export const get = <T = any>(
  url: string,
  params?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  return instance.get(url, { params, ...config })
}

// 封装POST请求
export const post = <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  return instance.post(url, data, config)
}

// 封装PUT请求
export const put = <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  return instance.put(url, data, config)
}

// 封装DELETE请求
export const del = <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  return instance.delete(url, config)
}

export default instance
