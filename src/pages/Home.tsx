import { Palette, Globe, Coffee } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import BaristaPopup from '../components/BaristaPopup'
import './home.css'

export default function Home() {
  const { products, loading } = useProducts()

  if (loading) {
    return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Cargando...</div>
  }

  return (
    <>
      <BaristaPopup />

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text-card">
            <span className="hero-subtitle">Café de Origen • Diseño Chileno</span>
            <h1 className="hero-title">El lado artístico del café</h1>
            <p className="hero-description">
              En Terrazul rompemos la solemnidad. Unimos granos de especialidad con el talento de artistas locales para transformar cada paquete en una pieza de colección.
            </p>
            <div className="hero-buttons">
              <Link to="/tienda" className="btn btn-primary">Ver Colección</Link>
              <Link to="/galeria" className="btn btn-outline">Explorar Galería</Link>
            </div>
          </div>
          <div className="hero-graphic">
            <img
              src="/logogeometrico.png"
              alt="Terrazul Geometric Star"
              className="hero-image-anim"
            />
          </div>
        </div>
      </section>

      {/* Brand Story / Value Prop */}
      <section className="brand-story">
        <div className="container">
          <div className="story-grid">
            <div className="story-item">
              <Globe className="story-icon" />
              <h3>Origen Terrazul</h3>
              <p>Inspirado en los amaneceres de Bolivia donde la tierra se tiñe de azul. Hoy, ese espíritu viaja buscando los mejores granos de Latinoamérica.</p>
            </div>
            <div className="story-item">
              <Palette className="story-icon" />
              <h3>Lienzo en Grano</h3>
              <p>No solo importamos café, curamos arte. Cada origen es interpretado por un ilustrador chileno distinto, creando una identidad visual única.</p>
            </div>
            <div className="story-item">
              <Coffee className="story-icon" />
              <h3>Sin Etiquetas</h3>
              <p>Para los que disfrutan lo visual tanto como el sabor. Café de especialidad sin complicaciones ni elitismos. Solo buen café y buen diseño.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="origin-section">
        <div className="container">
          <div className="origin-content">
            <span className="origin-subtitle">Nuestra Historia</span>
            <h2 className="origin-title">¿Por qué Terrazul?</h2>
            <div className="origin-text">
              <p>
                Todo comenzó en una zona cafetera de Bolivia, un lugar especial donde, al amanecer, la tierra adquiere un tono azulado único. De ahí nace nuestro nombre: <strong>Terrazul</strong>.
              </p>
              <p>
                Somos una marca con herencia familiar, retomada por una nueva generación de jóvenes profesionales. Lo que empezó como un negocio tradicional de importación, hoy se transforma en una propuesta que une lo mejor de dos mundos: la calidad del café de origen y la creatividad del diseño chileno.
              </p>
              <p>
                No buscamos ser solo otra marca de café de especialidad. Queremos que cada paquete sea un objeto de arte, una experiencia que empiece por los ojos y termine en una taza perfecta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product (Kantutani) */}
      <section className="product-feature">
        <div className="container">
          <div className="feature-card">
            <div className="feature-image">
              <img src="/Kantutani.webp" alt="Kantutani, Bolivia Coffee" />
            </div>
            <div className="feature-details">
              <span className="tag">Edición Especial</span>
              <h2 style={{ color: 'var(--text-white)' }}>Kantutani, Bolivia</h2>
              <p className="feature-artist-credit">Arte por <strong>Catalina Cartagena</strong></p>
              <span className="price">$14.000</span>
              <p className="feature-desc">
                Un perfil equilibrado con notas a chocolate y nuez. La ilustración captura la esencia de una exploradora científica estudiando el origen.
              </p>

              <div className="action-buttons">
                <Link to="/producto/kantutani-bolivia" className="btn btn-primary btn-full" style={{ backgroundColor: '#6495ED' }}>
                  Comprar Ahora
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Art Gallery Teaser */}
      <section className="gallery-teaser">
        <div className="container">
          <div className="teaser-content">
            <h2>¿Qué quieres explorar hoy?</h2>
            <p>Descubre las historias visuales detrás de cada origen en nuestra galería interactiva.</p>
            <Link to="/galeria" className="btn btn-outline btn-large">
              Ir a la Galería de Arte
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Releases Grid */}
      <section className="latest-releases">
        <div className="container">
          <h3 className="section-title">Nuestra Colección</h3>
          <div className="products-grid">
            {products.slice(1, 5).map((product) => (
              <Link to={`/producto/${product.id}`} className="product-card" key={product.id}>
                <div className="product-img-container">
                  {product.isNew && <span className="badge-new">Nuevo</span>}
                  <img src={product.img} alt={product.name} className="product-img" />
                </div>
                <h4 className="product-title">{product.name}</h4>
                <p className="product-artist-mini">Ilustración: {product.artInfo?.artistName || 'Artista Invitado'}</p>
                <span className="product-price">
                  {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(product.priceNumber)}
                </span>
                <button className="btn-small">Ver Detalle</button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* B2B / Contact */}
      <section className="about-section">
        <div className="container">
          <div className="about-card">
            <div className="about-image">
              <img src="/Trabajemos juntos.webp" alt="Barista" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
            </div>
            <div className="about-content">
              <h3 className="about-title">Lleva el arte a tu cafetería</h3>
              <p className="about-text">
                ¿Tienes una cafetería o tienda de diseño? Trabajemos juntos para ofrecer una experiencia que entra por los ojos y se queda en el paladar.
              </p>
              <button className="btn-small" style={{ width: 'fit-content' }}>Contáctanos</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
