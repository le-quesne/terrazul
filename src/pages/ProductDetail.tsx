import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import { Truck, ShieldCheck } from 'lucide-react'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [selectedWeight, setSelectedWeight] = useState('250g')
  const [selectedGrind, setSelectedGrind] = useState('Grano entero')
  const [viewMode, setViewMode] = useState<'product' | 'art'>('product')

  const product = products.find(p => p.id === id)
  const [activeImg, setActiveImg] = useState<string>('')
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Scroll to top when product changes
    window.scrollTo(0, 0)
    if (product) {
      setActiveImg(product.img)
    }
  }, [id, product])

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

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: '30px', fontSize: '14px', color: '#666' }}>
        <Link to="/" style={{ color: '#666', textDecoration: 'none' }}>Inicio</Link>
        <span style={{ margin: '0 10px' }}>/</span>
        <Link to="/tienda" style={{ color: '#666', textDecoration: 'none' }}>Tienda</Link>
        <span style={{ margin: '0 10px' }}>/</span>
        <span style={{ color: 'var(--primary-blue)', fontWeight: 500 }}>{product.name}</span>
      </div>

      <div className="product-detail-layout" style={{ 
        position: 'relative',
        display: 'grid', 
        gridTemplateColumns: viewMode === 'art' ? '1fr' : '1fr 1fr', 
        gap: viewMode === 'art' ? '20px' : '60px',
        alignItems: 'start'
      }}>
        {/* Toggle Switch */}
        {product.artInfo && (
          <div style={{ 
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 10,
            display: 'flex', 
            background: '#f0f0f0', 
            borderRadius: '30px', 
            padding: '4px', 
            width: 'fit-content', 
          }}>
            <button 
              onClick={() => setViewMode('product')}
              style={{ 
                padding: '8px 20px', 
                borderRadius: '25px', 
                border: 'none', 
                background: viewMode === 'product' ? 'white' : 'transparent', 
                color: viewMode === 'product' ? 'black' : '#666',
                fontWeight: 500,
                cursor: 'pointer',
                boxShadow: viewMode === 'product' ? '0 2px 5px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              Producto
            </button>
            <button 
              onClick={() => setViewMode('art')}
              style={{ 
                padding: '8px 20px', 
                borderRadius: '25px', 
                border: 'none', 
                background: viewMode === 'art' ? 'white' : 'transparent', 
                color: viewMode === 'art' ? 'black' : '#666',
                fontWeight: 500,
                cursor: 'pointer',
                boxShadow: viewMode === 'art' ? '0 2px 5px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              Arte
            </button>
          </div>
        )}

        {/* Left Column: Image */}
        <div className="product-gallery" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ 
            backgroundColor: 'transparent', 
            borderRadius: '12px', 
            padding: viewMode === 'art' ? '20px' : '40px', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            width: '100%',
            maxWidth: viewMode === 'art' ? '800px' : '100%'
          }}>
            <img 
              key={viewMode === 'product' ? activeImg : 'art'}
              src={viewMode === 'product' ? (activeImg || product.img) : (product.artInfo?.illustration || product.img)}  
              alt={product.name} 
              className="fade-in"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ 
                width: '100%', 
                maxWidth: viewMode === 'art' ? '550px' : '700px', 
                height: '500px', 
                objectFit: 'contain', 
                
                // Transition
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                
                // Product Mode
                filter: viewMode === 'product' ? 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' : 'sepia(0.1) contrast(1.05)',
                
                // Hippie/Creative Mode
                transform: viewMode === 'art' 
                  ? (isHovered ? 'rotate(-3deg) scale(1.1)' : 'rotate(-3deg) scale(1.05)')
                  : (viewMode === 'product' && activeImg === product.tastingProfileImage 
                      ? (isHovered ? 'scale(1.6)' : 'scale(1.4)') 
                      : (isHovered ? 'scale(1.2)' : 'none')),
                cursor: 'zoom-in',
                border: viewMode === 'art' ? '15px solid #fff' : 'none',
                boxShadow: viewMode === 'art' ? '5px 10px 20px rgba(0,0,0,0.15)' : 'none',
                borderRadius: viewMode === 'art' ? '2px' : '0'
              }} 
            />
          </div>

          {/* Thumbnails */}
          {viewMode === 'product' && product.tastingProfileImage && (
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
        <div className="product-info" style={{
          ...(viewMode === 'art' ? { maxWidth: '900px', margin: '0 auto', width: '100%' } : {}),
          paddingTop: (product.artInfo && viewMode === 'product') ? '60px' : '0'
        }}>
          {viewMode === 'product' ? (
            <div key="product" className="fade-in">
              {product.isNew && <span className="tag" style={{ marginBottom: '10px', display: 'inline-block' }}>Lo último</span>}
              
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '10px', color: 'var(--text-heading)' }}>
                {product.name}
              </h1>
              
              <div style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '20px' }}>
                {product.price}
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
                <button className="btn btn-primary" style={{ flex: 1, padding: '15px' }}>Agregar al carrito</button>
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
          ) : (
            <div key="art" className="art-mode-content fade-in" style={{ maxWidth: '800px', margin: '0 auto', fontFamily: '"Georgia", serif' }}>
              {product.artInfo ? (
                <>
                  <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <span style={{ display: 'inline-block', padding: '5px 15px', background: '#e8eaf6', color: 'var(--primary-blue)', borderRadius: '20px', fontSize: '0.9rem', marginBottom: '15px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>Historia del Arte</span>
                    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3.5rem', marginBottom: '20px', color: 'var(--text-heading)', letterSpacing: '-1px' }}>
                      {product.artInfo.title}
                    </h1>
                    <div style={{ fontSize: '2rem', color: 'var(--primary-blue)' }}>✦ ✦ ✦</div>
                  </div>
                  
                  <div style={{ fontSize: '1.25rem', lineHeight: '1.9', color: '#444', marginBottom: '60px', textAlign: 'center', fontStyle: 'italic' }}>
                    "{product.artInfo.description}"
                  </div>
                  
                  <div style={{ 
                    background: 'white', 
                    padding: '40px', 
                    borderRadius: '30px 10px 30px 10px', // Organic corners
                    border: '2px dashed var(--primary-blue)', // Dashed border
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(17, 25, 180, 0.05)'
                  }}>
                    <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'var(--primary-blue)', borderRadius: '50%', opacity: 0.1 }}></div>
                    
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', margin: '0 0 20px 0', color: 'var(--text-heading)' }}>
                            Conoce al Artista: <span style={{ color: 'var(--primary-blue)' }}>{product.artInfo.artistName}</span>
                        </h3>
                        
                        <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '25px' }}>
                        {product.artInfo.artistDescription}
                        </div>

                        {product.artInfo.artistSocials && (
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                            {product.artInfo.artistSocials.instagram && (
                            <a href={`https://instagram.com/${product.artInfo.artistSocials.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" style={{ 
                                textDecoration: 'none', 
                                color: '#fff', 
                                background: 'var(--primary-blue)',
                                padding: '8px 20px',
                                borderRadius: '20px',
                                fontWeight: 600, 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '8px',
                                boxShadow: '0 4px 6px rgba(17, 25, 180, 0.2)'
                            }}>
                                <span>Instagram</span>
                            </a>
                            )}
                            {product.artInfo.artistSocials.web && (
                            <a href={product.artInfo.artistSocials.web} target="_blank" rel="noreferrer" style={{ 
                                textDecoration: 'none', 
                                color: 'var(--primary-blue)', 
                                background: 'transparent',
                                border: '2px solid var(--primary-blue)',
                                padding: '6px 18px',
                                borderRadius: '20px',
                                fontWeight: 600, 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '8px'
                            }}>
                                <span>Web</span>
                            </a>
                            )}
                        </div>
                        )}
                    </div>
                  </div>
                </>
              ) : (
                <p style={{ textAlign: 'center', color: '#666' }}>Información de arte no disponible para este producto.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
