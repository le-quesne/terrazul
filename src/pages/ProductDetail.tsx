import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductById } from '../services/productService'
import type { Product } from '../types/product'
import { Truck, ShieldCheck } from 'lucide-react'
import { useCart } from '../context/CartContext'
import './product-detail.css'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [selectedWeight, setSelectedWeight] = useState('250g')
  const [selectedGrind, setSelectedGrind] = useState('Grano entero')
  const [viewMode, setViewMode] = useState<'product' | 'art'>('product')
  const { addToCart } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState<string>('')
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return
      setLoading(true)
      try {
        const data = await getProductById(id)
        setProduct(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  useEffect(() => {
    // Scroll to top when product changes
    window.scrollTo(0, 0)
    if (product) {
      setActiveImg(product.img)
    }
  }, [id, product])

  if (loading) {
    return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Cargando...</div>
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>Producto no encontrado</h2>
        <button onClick={() => navigate('/tienda')} className="btn btn-primary" style={{ marginTop: '20px' }}>
          Volver a la tienda
        </button>
      </div>
    )
  }

  // Calculate price based on selected weight
  const currentPrice = product && product.prices && product.prices[selectedWeight]
    ? product.prices[selectedWeight]
    : (product?.priceNumber || 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
  };

  const handleAddToCart = () => {
    // Create a product copy with the specific price for this weight
    const productToAdd = {
      ...product!,
      priceNumber: currentPrice,
    };
    addToCart(productToAdd, quantity, selectedWeight, selectedGrind);
  };

  return (
    <div className={viewMode === 'art' ? 'museum-mode-wrapper' : 'container'} style={{ position: 'relative', padding: viewMode === 'art' ? '0' : '40px 20px', transition: 'all 0.5s ease' }}>
      {/* Breadcrumb - Hide in Art Mode for immersion */}
      {viewMode === 'product' && (
        <div style={{ marginBottom: '30px', fontSize: '14px', color: '#666' }}>
          <Link to="/" style={{ color: '#666', textDecoration: 'none' }}>Inicio</Link>
          <span style={{ margin: '0 10px' }}>/</span>
          <Link to="/tienda" style={{ color: '#666', textDecoration: 'none' }}>Tienda</Link>
          <span style={{ margin: '0 10px' }}>/</span>
          <span style={{ color: 'var(--primary-blue)', fontWeight: 500 }}>{product.name}</span>
        </div>
      )}

      {/* Toggle Switch - Floating in Art Mode */}
      {product.artInfo && (
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 100,
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.3)', // More transparent
          backdropFilter: 'blur(20px) saturate(180%)', // Apple-like blur & saturation
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderRadius: '100px', // Pill shape
          padding: '5px',
          width: 'fit-content',
          transition: 'all 0.3s ease',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <button
            onClick={() => setViewMode('product')}
            style={{
              padding: '8px 24px',
              borderRadius: '100px',
              border: 'none',
              background: viewMode === 'product' ? '#FFFFFF' : 'transparent',
              color: viewMode === 'product' ? '#000000' : 'rgba(0,0,0,0.6)',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: viewMode === 'product' ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
            }}
          >
            Producto
          </button>
          <button
            onClick={() => setViewMode('art')}
            style={{
              padding: '8px 24px',
              borderRadius: '100px',
              border: 'none',
              background: viewMode === 'art' ? '#FFFFFF' : 'transparent',
              color: viewMode === 'art' ? '#000000' : 'rgba(0,0,0,0.6)',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: viewMode === 'art' ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
            }}
          >
            Arte
          </button>
        </div>
      )}

      {viewMode === 'product' ? (
        <div className="product-detail-layout" style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'start'
        }}>

          {/* Left Column: Image */}
          <div className="product-gallery" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              backgroundColor: 'transparent',
              borderRadius: '12px',
              padding: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
              <img
                src={activeImg || product.img}
                alt={product.name}
                className="fade-in"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  width: '100%',
                  maxWidth: '700px',
                  height: '500px',
                  objectFit: 'contain',
                  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))',
                  transform: activeImg === product.tastingProfileImage
                    ? (isHovered ? 'scale(1.6)' : 'scale(1.4)')
                    : (isHovered ? 'scale(1.2)' : 'none'),
                  cursor: 'zoom-in',
                }}
              />
            </div>

            {/* Thumbnails */}
            {product.tastingProfileImage && (
              <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                <button
                  onClick={() => setActiveImg(product.img)}
                  style={{
                    border: activeImg === product.img ? '2px solid var(--primary-blue)' : '2px solid transparent',
                    borderRadius: '10px',
                    padding: '3px',
                    cursor: 'pointer',
                    background: 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <img src={product.img} alt="Producto" style={{ width: '70px', height: '70px', objectFit: 'contain', borderRadius: '6px', background: 'white' }} />
                </button>
                <button
                  onClick={() => setActiveImg(product.tastingProfileImage!)}
                  style={{
                    border: activeImg === product.tastingProfileImage ? '2px solid var(--primary-blue)' : '2px solid transparent',
                    borderRadius: '10px',
                    padding: '3px',
                    cursor: 'pointer',
                    background: 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <img src={product.tastingProfileImage} alt="Perfil de taza" style={{ width: '70px', height: '70px', objectFit: 'contain', borderRadius: '6px', background: 'white' }} />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Details */}
          <div className="product-info">
            <div key="product" className="fade-in">
              {product.isNew && <span className="tag" style={{ marginBottom: '10px', display: 'inline-block' }}>Lo último</span>}

              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '10px', color: 'var(--text-heading)' }}>
                {product.name}
              </h1>

              <div style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '20px' }}>
                {formatPrice(currentPrice)}
              </div>

              <p style={{ lineHeight: '1.6', color: '#444', marginBottom: '30px' }}>
                {product.description}
              </p>

              {product.tastingNotes && (
                <div style={{ marginBottom: '30px' }}>
                  <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', color: '#888' }}>Notas de cata</h4>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {product.tastingNotes.map((note, index) => (
                      <span key={index} style={{ backgroundColor: '#f0f4ff', color: 'var(--primary-blue)', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 500 }}>
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Options */}
              <div className="options-container" style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '20px 0', marginBottom: '30px' }}>

                {/* Weight */}
                <div className="option-group" style={{ marginBottom: '20px' }}>
                  <span className="option-label" style={{ display: 'block', marginBottom: '10px', fontWeight: 500 }}>Peso</span>
                  <div className="option-buttons" style={{ display: 'flex', gap: '10px' }}>
                    {['250g', '1kg'].map(weight => (
                      <button
                        key={weight}
                        onClick={() => setSelectedWeight(weight)}
                        className={`option-btn ${selectedWeight === weight ? 'active' : ''}`}
                        style={{
                          padding: '8px 20px',
                          border: selectedWeight === weight ? '2px solid var(--primary-blue)' : '1px solid #ddd',
                          backgroundColor: selectedWeight === weight ? 'var(--primary-blue)' : 'transparent',
                          color: selectedWeight === weight ? 'white' : 'inherit',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: 500
                        }}
                      >
                        {weight}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grind */}
                <div className="option-group" style={{ marginBottom: '20px' }}>
                  <span className="option-label" style={{ display: 'block', marginBottom: '10px', fontWeight: 500 }}>Tipo de molienda</span>
                  <div className="option-buttons" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {['Grano entero', 'Molido fino', 'Molido medio', 'Molido grueso'].map(grind => (
                      <button
                        key={grind}
                        onClick={() => setSelectedGrind(grind)}
                        className={`option-btn ${selectedGrind === grind ? 'active' : ''}`}
                        style={{
                          padding: '8px 16px',
                          border: selectedGrind === grind ? '2px solid var(--primary-blue)' : '1px solid #ddd',
                          backgroundColor: selectedGrind === grind ? 'var(--primary-blue)' : 'transparent',
                          color: selectedGrind === grind ? 'white' : 'inherit',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        {grind}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="option-group">
                  <span className="option-label" style={{ display: 'block', marginBottom: '10px', fontWeight: 500 }}>Cantidad</span>
                  <div className="quantity-selector" style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px' }}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{ padding: '8px 15px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                    >-</button>
                    <span style={{ padding: '0 15px', fontWeight: 600 }}>{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      style={{ padding: '8px 15px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                    >+</button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="action-buttons" style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
                <button
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '15px' }}
                  onClick={handleAddToCart}
                >
                  Agregar al carrito
                </button>
              </div>

              {/* Features / Benefits */}
              <div className="product-benefits" style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '14px', color: '#555' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Truck size={18} /> <span>Envío gratis en compras sobre $35.000</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldCheck size={18} /> <span>Garantía de frescura garantizada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* MUSEUM MODE */
        <div className="museum-container fade-in">
          <div className="museum-spotlight"></div>

          <div className="museum-content">
            {/* Art Stage */}
            <div className="museum-art-stage">
              <div className="museum-frame museum-float">
                <img
                  src={product.artInfo?.illustration || product.img}
                  alt={`Arte: ${product.artInfo?.title}`}
                  className="museum-image"
                />
              </div>
            </div>

            {/* Placard */}
            <div className="museum-placard">
              <span className="museum-label">Colección Terrazul</span>
              <h2 className="museum-title">{product.artInfo?.title}</h2>
              <span className="museum-artist">por {product.artInfo?.artistName}</span>

              <div className="museum-description">
                {product.artInfo?.description.split('\n\n').map((paragraph, i) => (
                  <p key={i} style={{ marginBottom: '15px' }}>{paragraph}</p>
                ))}
              </div>

              <div className="museum-curator-note">
                <span className="museum-curator-title">Sobre el Artista</span>
                <p className="museum-curator-text">
                  {product.artInfo?.artistDescription.split('\n\n')[0]}...
                </p>
              </div>

              {product.artInfo?.artistSocials && (
                <div className="museum-socials">
                  {product.artInfo.artistSocials.instagram && (
                    <a href={`https://instagram.com/${product.artInfo.artistSocials.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="museum-social-link">
                      Instagram
                    </a>
                  )}
                  {product.artInfo.artistSocials.web && (
                    <a href={`https://${product.artInfo.artistSocials.web.replace('https://', '')}`} target="_blank" rel="noreferrer" className="museum-social-link">
                      Portafolio
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
