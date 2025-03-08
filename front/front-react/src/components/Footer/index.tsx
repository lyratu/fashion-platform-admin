import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="container mx-auto p-10">
        <div className="footer">
          <div>
            <span className="footer-title">服务</span>
            <Link to="/help" className="link link-hover">帮助中心</Link>
            <Link to="/return" className="link link-hover">退换货</Link>
            <Link to="/shipping" className="link link-hover">配送方式</Link>
            <Link to="/payment" className="link link-hover">支付方式</Link>
          </div>
          <div>
            <span className="footer-title">公司</span>
            <Link to="/about" className="link link-hover">关于我们</Link>
            <Link to="/contact" className="link link-hover">联系我们</Link>
            <Link to="/careers" className="link link-hover">招贤纳士</Link>
            <Link to="/press" className="link link-hover">新闻中心</Link>
          </div>
          <div>
            <span className="footer-title">法律</span>
            <Link to="/terms" className="link link-hover">服务条款</Link>
            <Link to="/privacy" className="link link-hover">隐私政策</Link>
            <Link to="/cookies" className="link link-hover">Cookie政策</Link>
          </div>
        </div>
        <div className="mt-10 border-t border-neutral-700 pt-10 text-center">
          <p>© 2023 服装社区 - 版权所有</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
