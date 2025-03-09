import { NavigateFunction } from 'react-router-dom';

// 白名单路由，这些路由不需要登录就可以访问
const whiteList = ['/login', '/register'];

export function setupGuard(navigate: NavigateFunction) {
  // 获取当前路径
  const currentPath = window.location.pathname;

  // 获取token
  const token = localStorage.getItem('token');

  // 如果没有token
  if (!token) {
    // 如果当前路径不在白名单中，重定向到登录页
    if (!whiteList.includes(currentPath)) {
      navigate('/login');
    }
  } else {
    // 如果有token且在登录页，重定向到首页
    if (currentPath === '/login') {
      navigate('/');
    }
  }
}
