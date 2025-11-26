import { Routes, Route } from 'react-router-dom'
import './App.css'
import { CreditCard } from 'lucide-react'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import CartSidebar from './components/CartSidebar'

function App() {
  return (
    <CartProvider>
      <div className="app">
        <CartSidebar />
        {/* Announcement Bar */}
        <div className="announcement-bar">
          Envío gratis sobre $35.000 clp
        </div>

        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tienda" element={<Shop />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
        </Routes>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="payment-icons">
              <span className="payment-icon" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><CreditCard size={20} /> Visa</span>
              <span className="payment-icon" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><CreditCard size={20} /> Mastercard</span>
              <span className="payment-icon" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><CreditCard size={20} /> Amex</span>
            </div>
            <div className="footer-brand">
              <img src="/logo.png" alt="Terrazul Icon" style={{ height: '20px', marginBottom: '10px' }} />
            </div>
            <p>© 2025, Terrazul - Café club - Desarrollo UAI</p>
          </div>
        </footer>
      </div>
    </CartProvider>
  )
}

export default App
