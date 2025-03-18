import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation
} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Outfits from '@/pages/Outfits/Outfits'
import Shop from '@/pages/Shop/Shop'
import Community from '@/pages/Community/Community'
import Detail from '@/pages/Community/Detail'
import ShopCar from '@/pages/ShopCar/ShopCar'
import Product from '@/pages/Shop/Product'
import Wardrobe from '@/pages/Wardrobe/Wardrobe'
import OutfitDetail from '@/pages/Outfits/OutfitDetail'
import Register from '@/pages/Register'
import Navbar from './Navbar'
import '../global.scss' // 引入全局样式
import { setupGuard } from '../router/guard'
import { useEffect } from 'react'
import 'daisyui/dist/full.css'
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

// 创建一个包装组件来使用useNavigate hook
function AppContent() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // 在组件挂载时设置路由守卫
    setupGuard(navigate)
  }, [navigate])

  // 定义不需要显示导航栏的路由
  const noNavbarRoutes = ['/login', '/register', '/401', '/403', '/404', '/500']
  const shouldShowNavbar = !noNavbarRoutes.some(route => location.pathname.startsWith(route))

  return (
    <>
      <Toaster />
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/outfits" element={<Outfits />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/community" element={<Community />} />
        <Route path="/Wardrobe" element={<Wardrobe />} />
        <Route path="/ShopCar" element={<ShopCar />} />
        <Route path="/community/:id" element={<Detail />} />
        <Route path="/shop/:id" element={<Product />} />
        <Route path="/outfits/:id" element={<OutfitDetail />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
