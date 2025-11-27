import { useState } from 'react';
import type { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Zap, Palette } from 'lucide-react';

interface CosmicProductDetailProps {
    product: Product;
    onBack: () => void;
}

export default function CosmicProductDetail({ product, onBack }: CosmicProductDetailProps) {
    const { addToCart } = useCart();
    const [selectedWeight, setSelectedWeight] = useState(Object.keys(product.prices || { '250g': product.priceNumber })[0]);
    const [showArt, setShowArt] = useState(false);

    const currentPrice = product.prices?.[selectedWeight] || product.priceNumber;

    const handleAddToCart = () => {
        addToCart(product, 1, selectedWeight);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="cosmic-detail-container"
            style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '50px',
                color: '#fff',
                padding: '20px'
            }}
        >
            {/* Left Column: Visuals */}
            <div className="cosmic-detail-visuals">
                <button
                    onClick={onBack}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#1119B4',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                        marginBottom: '20px',
                        fontFamily: '"Share Tech Mono", monospace'
                    }}
                >
                    <ArrowLeft /> RETURN TO LIST
                </button>

                <div className="cosmic-detail-image" style={{ position: 'relative', height: '500px', border: '1px solid rgba(17, 25, 180, 0.5)', overflow: 'hidden' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={showArt ? 'art' : 'product'}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                width: '100%',
                                height: '100%',
                                background: `url("${showArt && product.artInfo?.illustration ? product.artInfo.illustration : product.img}") center/cover`,
                                filter: showArt ? 'none' : 'sepia(100%) hue-rotate(190deg) saturate(150%)',
                            }}
                        />
                    </AnimatePresence>

                    {/* Overlay Grid */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(rgba(2, 4, 20, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(2, 4, 20, 0.2) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                        pointerEvents: 'none'
                    }} />

                    {/* Toggle Button */}
                    {product.artInfo?.illustration && (
                        <button
                            onClick={() => setShowArt(!showArt)}
                            style={{
                                position: 'absolute',
                                bottom: '20px',
                                right: '20px',
                                background: 'rgba(2, 4, 20, 0.8)',
                                border: '1px solid #1119B4',
                                color: '#fff',
                                padding: '10px 20px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                fontFamily: '"Orbitron", sans-serif',
                                backdropFilter: 'blur(5px)'
                            }}
                        >
                            <Palette size={16} />
                            {showArt ? 'VIEW PRODUCT' : 'VIEW ARTWORK'}
                        </button>
                    )}
                </div>

                {/* Art Info */}
                {showArt && product.artInfo && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            marginTop: '20px',
                            padding: '20px',
                            background: 'rgba(17, 25, 180, 0.1)',
                            border: '1px solid rgba(17, 25, 180, 0.3)'
                        }}
                    >
                        <h3 style={{ fontFamily: '"Orbitron", sans-serif', color: '#1119B4', margin: '0 0 10px 0' }}>
                            {product.artInfo.title}
                        </h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{product.artInfo.description}</p>
                        <div style={{ marginTop: '15px', fontSize: '0.8rem', color: '#1119B4' }}>
                            ARTIST: {product.artInfo.artistName}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Right Column: Data */}
            <div>
                <h1 className="cosmic-detail-title" style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '3rem', margin: '0 0 10px 0', textShadow: '0 0 20px rgba(17, 25, 180, 0.5)' }}>
                    {product.name}
                </h1>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                    {product.tastingNotes?.map(note => (
                        <span key={note} style={{
                            border: '1px solid #1119B4',
                            padding: '5px 10px',
                            color: '#1119B4',
                            fontSize: '0.8rem',
                            textTransform: 'uppercase'
                        }}>
                            {note}
                        </span>
                    ))}
                </div>

                <p style={{ lineHeight: '1.6', opacity: 0.9, marginBottom: '30px' }}>
                    {product.description}
                </p>

                {/* Stats */}
                <div style={{ marginBottom: '30px', display: 'grid', gap: '15px' }}>
                    <StatBar label="ACIDITY" value={product.acidity || 0} />
                    <StatBar label="INTENSITY" value={product.intensity || 0} />
                    <StatBar label="BITTERNESS" value={product.bitterness || 0} />
                </div>

                {/* Controls */}
                <div style={{
                    background: 'rgba(2, 4, 20, 0.6)',
                    padding: '30px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.8rem', color: '#1119B4' }}>UNIT SIZE</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {Object.keys(product.prices || {}).map(weight => (
                                <button
                                    key={weight}
                                    onClick={() => setSelectedWeight(weight)}
                                    style={{
                                        background: selectedWeight === weight ? '#1119B4' : 'transparent',
                                        border: '1px solid #1119B4',
                                        color: selectedWeight === weight ? '#fff' : '#1119B4',
                                        padding: '10px 20px',
                                        cursor: 'pointer',
                                        fontFamily: '"Share Tech Mono", monospace',
                                        flex: 1
                                    }}
                                >
                                    {weight}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <span style={{ fontSize: '0.9rem' }}>TOTAL COST</span>
                        <span style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '2rem', color: '#1119B4' }}>
                            {currentPrice} CR
                        </span>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        style={{
                            width: '100%',
                            background: '#1119B4',
                            border: 'none',
                            padding: '15px',
                            color: '#fff',
                            fontFamily: '"Orbitron", sans-serif',
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            boxShadow: '0 0 20px rgba(17, 25, 180, 0.4)'
                        }}
                    >
                        <Zap />
                        ADD TO CARGO
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

const StatBar = ({ label, value }: { label: string, value: number }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <span style={{ width: '100px', fontSize: '0.8rem', color: '#1119B4' }}>{label}</span>
        <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', position: 'relative' }}>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value * 20}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                style={{
                    height: '100%',
                    background: '#1119B4',
                    boxShadow: '0 0 10px #1119B4'
                }}
            />
        </div>
        <span style={{ width: '30px', textAlign: 'right', fontSize: '0.8rem' }}>{value}/5</span>
    </div>
);
