interface ErrorConfig {
  title: string;
  description: string;
  buttonText: string;
}

export const errorConfigs: Record<string, ErrorConfig> = {
  '403': {
    title: '403 - 访问被禁止',
    description: '抱歉，您没有权限访问此页面',
    buttonText: '返回首页'
  },
  '404': {
    title: '404 - 页面不存在',
    description: '抱歉，您访问的页面不存在',
    buttonText: '返回首页'
  },
  '500': {
    title: '500 - 服务器错误',
    description: '抱歉，服务器出现了错误',
    buttonText: '返回首页'
  },
  '401': {
    title: '401 - 未授权访问',
    description: '抱歉，您需要登录后才能访问',
    buttonText: '去登录'
  }
}
