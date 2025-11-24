import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'

export default function Shop() {
  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '40px', color: 'var(--text-heading)' }}>Productos</h1>
      
      {/* Filters and Sorting Bar */}
      <div className="shop-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
        
        {/* Left side: Filters */}
        <div className="filters-group" style={{ display: 'flex', gap: '20px' }}>
            <span style={{ alignSelf: 'center', fontWeight: 500 }}>Filtrar:</span>
            
            {/* Availability Dropdown */}
            <div style={{ position: 'relative' }}>
                <details className="filter-dropdown">
                    <summary style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', listStyle: 'none' }}>
                        Disponibilidad <ChevronDown size={16} />
                    </summary>
                    <div className="dropdown-content" style={{ position: 'absolute', top: '100%', left: 0, background: 'white', border: '1px solid #ddd', padding: '15px', zIndex: 10, width: '200px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px', marginTop: '5px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '8px' }}>
                            <input type="checkbox" /> En stock (12)
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                            <input type="checkbox" /> Agotado (2)
                        </label>
                    </div>
                </details>
            </div>

            {/* Price Dropdown */}
            <div style={{ position: 'relative' }}>
                <details className="filter-dropdown">
                    <summary style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', listStyle: 'none' }}>
                        Precio <ChevronDown size={16} />
                    </summary>
                    <div className="dropdown-content" style={{ position: 'absolute', top: '100%', left: 0, background: 'white', border: '1px solid #ddd', padding: '15px', zIndex: 10, width: '250px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px', marginTop: '5px' }}>
                         <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <span>$</span>
                            <input type="number" placeholder="0" style={{ width: '100%', padding: '5px', border: '1px solid #ddd', borderRadius: '4px' }} />
                            <span>-</span>
                            <input type="number" placeholder="Max" style={{ width: '100%', padding: '5px', border: '1px solid #ddd', borderRadius: '4px' }} />
                        </div>
                    </div>
                </details>
            </div>
        </div>

        {/* Right side: Sorting & Count */}
        <div className="sorting-group" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ color: '#666' }}>{products.length} productos</span>
            <select style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', cursor: 'pointer' }}>
              <option>Destacados</option>
              <option>Precio: Menor a Mayor</option>
              <option>Precio: Mayor a Menor</option>
              <option>Más nuevos</option>
            </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
        {products.map((product) => (
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
  )
}
