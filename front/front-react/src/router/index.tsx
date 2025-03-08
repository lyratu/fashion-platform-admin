import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
// ... 其他导入
import OrderList from '../pages/Order/OrderList'
import OrderDetail from '../pages/Order/OrderDetail'
import OrderConfirm from '../pages/Order/OrderConfirm'
import OrderPayment from '../pages/Order/OrderPayment'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // ... 其他路由
      {
        path: '/orders',
        element: <OrderList />
      },
      {
        path: '/order/detail/:orderId',
        element: <OrderDetail />
      },
      {
        path: '/order/confirm/:orderId',
        element: <OrderConfirm />
      },
      {
        path: '/order/payment/:orderId',
        element: <OrderPayment />
      }
    ]
  }
])

export default router
