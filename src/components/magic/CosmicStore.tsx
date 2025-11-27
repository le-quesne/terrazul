import { useEffect, useState } from 'react';
import { getProducts } from '../../services/productService';
import type { Product } from '../../types/product';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CosmicStore({ onSelectProduct }: { onSelectProduct: (product: Product) => void }) {
    const [products, setProducts] = useState<Product[]>([]);
    const { addToCart } = useCart();

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    return (
        <div className="cosmic-store-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '30px',
            padding: '20px',
            maxWidth: '1400px',
            margin: '0 auto'
        }}>
            {products.map((product, i) => (
                <CosmicCard
                    key={product.id}
                    product={product}
                    index={i}
                    addToCart={addToCart}
                    onSelect={() => onSelectProduct(product)}
                />
            ))}
        </div>
    );
}

const CosmicCard = ({ product, index, addToCart, onSelect }: { product: Product, index: number, addToCart: any, onSelect: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(17, 25, 180, 0.5)' }}
            style={{
                background: 'rgba(2, 4, 20, 0.8)',
                border: '1px solid #1119B4',
                padding: '20px',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
                clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'
            }}
        >
            {/* Holographic Image */}
            <div
                onClick={onSelect}
                style={{
                    height: '200px',
                    background: `url("${product.img}") center/cover`,
                    marginBottom: '20px',
                    filter: 'sepia(100%) hue-rotate(190deg) saturate(150%)', // Deep Blue tint
                    border: '1px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer'
                }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div onClick={onSelect} style={{ cursor: 'pointer' }}>
                    <h3 style={{
                        margin: '0 0 5px 0',
                        fontFamily: '"Orbitron", sans-serif',
                        color: '#fff',
                        fontSize: '1.2rem'
                    }}>
                        {product.name}
                    </h3>
                    <div style={{
                        fontSize: '0.8rem',
                        color: '#1119B4',
                        marginBottom: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        fontWeight: 'bold'
                    }}>
                        Class: {product.roastLevel || 'UNKNOWN'}
                    </div>
                </div>
                <div style={{
                    background: 'rgba(17, 25, 180, 0.2)',
                    padding: '5px 10px',
                    border: '1px solid #1119B4',
                    color: '#ffffff',
                    fontWeight: 'bold'
                }}>
                    {product.prices?.['250g'] || product.priceNumber} CR
                </div>
            </div>

            {/* Tech Specs */}
            <div style={{
                display: 'flex',
                gap: '5px',
                flexWrap: 'wrap',
                margin: '15px 0',
                fontSize: '0.7rem'
            }}>
                {product.tastingNotes?.slice(0, 3).map((note: string) => (
                    <span key={note} style={{
                        border: '1px solid rgba(255,255,255,0.3)',
                        padding: '2px 6px',
                        color: 'rgba(255,255,255,0.7)'
                    }}>
                        {note}
                    </span>
                ))}
            </div>

            <motion.button
                whileHover={{ backgroundColor: '#1119B4', color: '#fff' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addToCart(product)}
                style={{
                    width: '100%',
                    padding: '12px',
                    background: 'transparent',
                    border: '1px solid #1119B4',
                    color: '#1119B4',
                    fontFamily: '"Orbitron", sans-serif',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    marginTop: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontWeight: 'bold'
                }}
            >
                <Zap size={16} />
                Initialize Transfer
            </motion.button>

            {/* Decorative Corner */}
            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '30px',
                height: '30px',
                background: 'linear-gradient(135deg, transparent 50%, #1119B4 50%)',
                opacity: 0.8
            }} />
        </motion.div>
    );
};
