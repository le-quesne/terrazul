import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../types/product';
import './art-gallery.css';

export default function ArtGallery() {
    const { products, loading } = useProducts();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Filter products that have art info
    const artProducts = products.filter(p => p.artInfo && p.artInfo.illustration);

    if (loading) {
        return (
            <div className="gallery-container" style={{ backgroundColor: '#111', color: '#fff' }}>
                <h2>Cargando Galería...</h2>
            </div>
        );
    }

    if (artProducts.length === 0) {
        return (
            <div className="gallery-container">
                <h2>No hay obras disponibles por el momento.</h2>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '100px' }}>
            <div style={{ textAlign: 'center', paddingTop: '40px' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', color: '#333' }}>Galería de Arte</h1>
                <p style={{ color: '#666' }}>Explora las ilustraciones de nuestros orígenes</p>
            </div>

            <div className="gallery-container">
                <div className="gallery-panels">
                    {artProducts.map((product) => (
                        <div
                            key={product.id}
                            className={`panel ${selectedProduct?.id === product.id ? 'selected' : ''}`}
                            style={{ backgroundImage: `url(${product.artInfo?.illustration})` }}
                            onClick={() => setSelectedProduct(product)}
                        >
                            {/* Vertical Label for inactive state */}
                            <div className="panel-label">
                                {product.name.split(' ')[0]}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Details Section */}
            {selectedProduct && (
                <div className="art-details-section">
                    <div className="details-content">
                        <span className="details-subtitle">Colección Terrazul</span>
                        <h2 className="details-title">{selectedProduct.artInfo?.title}</h2>
                        <h3 className="details-artist">por {selectedProduct.artInfo?.artistName}</h3>

                        <div className="details-description">
                            {selectedProduct.artInfo?.description?.split('\n\n').map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                        </div>

                        <Link to={`/producto/${selectedProduct.id}`} className="view-btn">
                            Ver Producto y Café
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
