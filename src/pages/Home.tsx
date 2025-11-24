import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import BaristaPopup from '../components/BaristaPopup'

export default function Home() {
  const [quantity, setQuantity] = useState(1)

  return (
    <>
      <BaristaPopup />
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text-card">
            <h1 className="hero-title">Tostando café desde el espacio exterior</h1>
            <p className="hero-description">
              En Terrazul, perfeccionamos el arte del café. Cada grano es seleccionado y tostado con precisión para asegurar que cada taza ofrezca una experiencia de sabor excepcional.
            </p>
            <button className="btn btn-primary">Tienda</button>
          </div>
          <div className="hero-graphic">
            {/* Hero Graphic Image */}
            <img 
              src="/logogeometrico.png" 
              alt="Terrazul Geometric Star" 
              style={{ width: '500px', height: 'auto', objectFit: 'contain' }} 
            />
          </div>
        </div>
      </section>

      {/* Product Feature */}
      <section className="product-feature">
        <div className="container">
          <div className="feature-card">
            <div className="feature-image">
              {/* Placeholder for actual product packaging image */}
              <img src="/Kantutani.webp" alt="Kantutani, Bolivia Coffee" />
            </div>
            <div className="feature-details">
              <span className="tag">Lo último</span>
              <h2 style={{ color: 'var(--text-white)' }}>Kantutani, Bolivia</h2>
              <span className="price">$14.000</span>
              <p style={{fontSize: '12px', marginBottom: '20px'}}>Los gastos de envío se calculan en la pantalla de pago.</p>
              
              <div className="options">
                <div className="option-group">
                  <span className="option-label">Peso</span>
                  <div className="option-buttons">
                    <button className="option-btn active">250g</button>
                    <button className="option-btn">1kg</button>
                  </div>
                </div>
                
                <div className="option-group">
                  <span className="option-label">Tipo de molienda</span>
                  <div className="option-buttons" style={{flexWrap: 'wrap'}}>
                    <button className="option-btn active">Grano entero (recomendado)</button>
                    <button className="option-btn">Molido fino</button>
                    <button className="option-btn">Molido grueso</button>
                    <button className="option-btn">Molido medio</button>
                  </div>
                </div>
                
                <div className="option-group">
                  <span className="option-label">Cantidad</span>
                  <div className="quantity-selector">
                    <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <span className="qty-value">{quantity}</span>
                    <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                </div>
              </div>
              
              <div className="action-buttons">
                <button className="btn btn-outline btn-full">Agregar al carrito</button>
                <button className="btn btn-primary btn-full" style={{backgroundColor: '#6495ED'}}>Comprar ahora</button>
              </div>
              
              <Link to="/producto/kantutani-bolivia" style={{display: 'block', marginTop: '15px', fontSize: '12px', textAlign: 'center'}}>Ver todos los detalles →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Releases */}
      <section className="latest-releases">
        <div className="container">
          <h3 className="section-title">Últimos lanzamientos</h3>
          <div className="products-grid">
            {products.slice(1, 5).map((product) => (
              <Link to={`/producto/${product.id}`} className="product-card" key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="product-img-container">
                  {product.isNew && <span className="badge-new">Oferta</span>}
                  <img src={product.img} alt={product.name} className="product-img" />
                </div>
                <h4 className="product-title">{product.name}</h4>
                <span className="product-price">{product.price}</span>
                <button className="btn-small">Comprar</button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-card">
            <div className="about-image">
              <img src="/Trabajemos juntos.webp" alt="Barista" style={{objectFit: 'cover', height: '100%', width: '100%'}} />
            </div>
            <div className="about-content">
              <h3 className="about-title">Trabajemos juntos por entregar café al mundo</h3>
              <p className="about-text">
                Conéctate con nosotros y descubre las ventajas exclusivas para mayoristas. ¡Haz que tu negocio brille con Terrazul! Estamos listos para ayudar a sobresalir.
              </p>
              <button className="btn-small" style={{width: 'fit-content'}}>Contáctanos</button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <h2>Suscríbete al mundo del café</h2>
          <p>Sé el primero en enterarte de nuevas colecciones y ofertas exclusivas.</p>
          <div className="email-form">
            <input type="email" placeholder="Correo electrónico" className="email-input" />
            <button className="submit-btn"><ArrowRight size={20} /></button>
          </div>
        </div>
      </section>
    </>
  )
}
