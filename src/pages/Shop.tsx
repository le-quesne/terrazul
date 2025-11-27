import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useProducts } from '../hooks/useProducts'

export default function Shop() {
  const { products, loading } = useProducts()
  const [isTastingMode, setIsTastingMode] = useState(false)

  // Filter States
  const [minPrice, setMinPrice] = useState<number | ''>('')
  const [maxPrice, setMaxPrice] = useState<number | ''>('')
  const [sortOption, setSortOption] = useState('featured')
  const [selectedRoasts, setSelectedRoasts] = useState<string[]>([])

  if (loading) {
    return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Cargando...</div>
  }

  // Derive unique roast levels from products
  const roastLevels = Array.from(new Set(products.map(p => p.roastLevel).filter(Boolean))) as string[];

  const handleRoastChange = (roast: string) => {
    setSelectedRoasts(prev =>
      prev.includes(roast)
        ? prev.filter(r => r !== roast)
        : [...prev, roast]
    );
  };

  // Filter and Sort Logic
  const filteredProducts = products
    .filter(product => {
      // Price Filter
      if (minPrice !== '' && product.priceNumber < minPrice) return false;
      if (maxPrice !== '' && product.priceNumber > maxPrice) return false;

      // Roast Filter
      if (selectedRoasts.length > 0 && (!product.roastLevel || !selectedRoasts.includes(product.roastLevel))) return false;

      return true;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.priceNumber - b.priceNumber;
        case 'price-desc':
          return b.priceNumber - a.priceNumber;
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default: // featured
          return 0;
      }
    });

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '40px', color: 'var(--text-heading)' }}>Productos</h1>

      {/* Filters and Sorting Bar */}
      <div className="shop-controls">

        {/* Left side: Filters */}
        <div className="filters-group">
          <span style={{ alignSelf: 'center', fontWeight: 500 }}>Filtrar:</span>

          {/* Roast Level Dropdown */}
          <div style={{ position: 'relative' }}>
            <details className="filter-dropdown">
              <summary style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', listStyle: 'none' }}>
                Nivel de Tostado <ChevronDown size={16} />
              </summary>
              <div className="dropdown-content dropdown-roast">
                {roastLevels.length > 0 ? roastLevels.map(roast => (
                  <label key={roast} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '8px' }}>
                    <input
                      type="checkbox"
                      checked={selectedRoasts.includes(roast)}
                      onChange={() => handleRoastChange(roast)}
                    />
                    {roast}
                  </label>
                )) : <div style={{ color: '#888', fontSize: '0.9rem' }}>No hay niveles disponibles</div>}
              </div>
            </details>
          </div>

          {/* Price Dropdown */}
          <div style={{ position: 'relative' }}>
            <details className="filter-dropdown">
              <summary style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', listStyle: 'none' }}>
                Precio <ChevronDown size={16} />
              </summary>
              <div className="dropdown-content dropdown-price">
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span>$</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : '')}
                    style={{ width: '100%', padding: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')}
                    style={{ width: '100%', padding: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
              </div>
            </details>
          </div>
        </div>

        {/* Right side: Sorting & Count */}
        <div className="sorting-group" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Toggle Switch */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: '10px' }}>
            <span style={{ fontSize: '14px', fontWeight: 500, color: isTastingMode ? 'var(--primary-blue)' : '#666' }}>Modo Cata</span>
            <button
              onClick={() => setIsTastingMode(!isTastingMode)}
              style={{
                width: '44px',
                height: '24px',
                backgroundColor: isTastingMode ? 'var(--primary-blue)' : '#ccc',
                borderRadius: '12px',
                position: 'relative',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
            >
              <div style={{
                width: '18px',
                height: '18px',
                backgroundColor: 'white',
                borderRadius: '50%',
                position: 'absolute',
                top: '3px',
                left: isTastingMode ? '23px' : '3px',
                transition: 'left 0.3s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
              }} />
            </button>
          </div>

          <span style={{ color: '#666' }}>{filteredProducts.length} productos</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', cursor: 'pointer' }}
          >
            <option value="featured">Destacados</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="newest">Más nuevos</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const hasTasting = !!product.tastingProfileImage;
            // Determine which image is main and which is hover based on mode
            // Standard: Main = Product, Hover = Tasting
            // Inverted (Tasting Mode): Main = Tasting (if exists), Hover = Product

            let mainImg = product.img;
            let hoverImg = product.tastingProfileImage;

            if (isTastingMode && hasTasting) {
              mainImg = product.tastingProfileImage!;
              hoverImg = product.img;
            }

            const isMainTasting = isTastingMode && hasTasting;
            const isHoverTasting = !isTastingMode && hasTasting;

            return (
              <Link to={`/producto/${product.id}`} className="product-card" key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={`product-img-container ${hasTasting ? 'has-hover' : ''}`}>
                  {product.isNew && <span className="badge-new">Oferta</span>}
                  <img
                    src={mainImg}
                    alt={product.name}
                    className={`product-img product-img-main ${isMainTasting ? 'tasting-img' : ''}`}
                  />
                  {hasTasting && (
                    <img
                      src={hoverImg}
                      alt={`${product.name} hover`}
                      className={`product-img product-img-hover ${isHoverTasting ? 'tasting-img' : ''}`}
                    />
                  )}
                </div>
                <h4 className="product-title">{product.name}</h4>
                <span className="product-price">
                  {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(product.priceNumber)}
                </span>
                <button className="btn-small">Comprar</button>
              </Link>
            )
          })
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#666' }}>
            No se encontraron productos con estos filtros.
          </div>
        )}
      </div>
    </div>
  )
}
