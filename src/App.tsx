import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { Search, User, ShoppingBag, CreditCard } from 'lucide-react'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'

function App() {
  return (
    <div className="app">
      {/* Announcement Bar */}
      <div className="announcement-bar">
        Envío gratis sobre $35.000 clp
      </div>

      {/* Header */}
      <header className="header">
        <div className="container nav">
          <div className="nav-icons-left">
            <button className="btn-icon"><Search size={20} /></button>
          </div>
          
          <div className="logo">
            <Link to="/">
              <img src="/logo.png" alt="Terrazul" />
            </Link>
          </div>
          
          <div className="nav-icons">
            <a href="#account"><User size={20} /></a>
            <a href="#cart"><ShoppingBag size={20} /></a>
          </div>
        </div>
        <div className="container nav-links-container">
           <nav className="nav-links">
            <Link to="/">Inicio</Link>
            <Link to="/tienda">Tienda</Link>
            <a href="#contacto">Contacto</a>
          </nav>
        </div>
      </header>

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
             <img src="/logo.png" alt="Terrazul Icon" style={{height: '20px', marginBottom: '10px'}} />
          </div>
          <p>© 2025, Terrazul - Café club - Desarrollo UAI</p>
        </div>
      </footer>
    </div>
  )
}

export default App
