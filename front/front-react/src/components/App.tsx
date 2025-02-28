import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Outfits from '../pages/Outfits/Outfits'
import Shop from '../pages/Shop/Shop'
import Community from '../pages/Community/Community'
import Detail from '../pages/Community/Detail'
import ShopCar from '../pages/ShopCar/ShopCar'
import Product from '../pages/Shop/Product'
import Wardrobe from '../pages/Wardrobe/Wardrobe'
import OutfitDetail from '../pages/Outfits/OutfitDetail'
import Navbar from './Navbar'
import '../global.css' // 引入全局样式

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/outfits" element={<Outfits />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/community" element={<Community />} />
        <Route path="/Wardrobe" element={<Wardrobe />} />
        <Route path="/ShopCar" element={<ShopCar />} />
        <Route path="/community/:id" element={<Detail />} />
        <Route path="/shop/:id" element={<Product />} />
        <Route path="/outfits/:id" element={<OutfitDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
