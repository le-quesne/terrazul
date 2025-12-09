import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import CartSidebar from './components/CartSidebar'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import NewProduct from './pages/admin/NewProduct'
import EditProduct from './pages/admin/EditProduct'
import ProtectedRoute from './components/ProtectedRoute'
import { MagicProvider, useMagic } from './context/MagicContext'
import CosmicApp from './components/magic/CosmicApp'
import ArtGallery from './pages/ArtGallery'

function AppContent() {
  const { isMagicMode } = useMagic();

  if (isMagicMode) {
    return <CosmicApp />;
  }

  return (
    <div className="app">
      <CartSidebar />
      {/* Announcement Bar */}
      <div className="announcement-bar">
        Envío gratis sobre $35.000 clp
      </div>

      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tienda" element={<Shop />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/galeria" element={<ArtGallery />} />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/products/new" element={
            <ProtectedRoute>
              <NewProduct />
            </ProtectedRoute>
          } />
          <Route path="/admin/products/edit/:id" element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <MagicProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </MagicProvider>
  )
}

export default App
