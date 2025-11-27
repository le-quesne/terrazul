import { useState, useEffect } from 'react';
import { useMagic } from '../../context/MagicContext';
import { useCart } from '../../context/CartContext';
import MagicMode from './MagicMode';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, ShoppingBag, X } from 'lucide-react';
import CosmicStore from './CosmicStore';
import CosmicProductDetail from './CosmicProductDetail';
import CosmicCart from './CosmicCart';
import type { Product } from '../../types/product';

export default function CosmicApp() {
    const { toggleMagicMode } = useMagic();
    const { cartCount } = useCart();
    const [view, setView] = useState<'dashboard' | 'cargo' | 'detail'>('dashboard');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Load Google Font & Inject Styles
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Share+Tech+Mono&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        const style = document.createElement('style');
        style.innerHTML = `
            .cosmic-app {
                font-family: "Share Tech Mono", monospace;
                color: #ffffff;
                height: 100vh;
                width: 100vw;
                overflow: hidden;
                position: relative;
            }
            
            .cosmic-header {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                z-index: 100;
                background: linear-gradient(to bottom, rgba(2, 4, 20, 0.9), transparent);
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }

            .cosmic-header-left {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .cosmic-header-right {
                display: flex;
                gap: 20px;
            }

            .cosmic-main {
                padding-top: 100px;
                height: 100%;
                overflow-y: auto;
                padding-bottom: 50px;
            }

            /* Mobile Responsiveness */
            @media (max-width: 768px) {
                .cosmic-header {
                    flex-direction: column;
                    gap: 15px;
                    padding: 15px;
                    background: rgba(2, 4, 20, 0.95);
                }
                
                .cosmic-header-right {
                    width: 100%;
                    justify-content: space-between;
                    gap: 10px;
                }

                .cosmic-main {
                    padding-top: 140px; /* More space for taller header */
                }

                /* Store Grid */
                .cosmic-store-grid {
                    grid-template-columns: 1fr !important;
                    gap: 20px !important;
                    padding: 15px !important;
                }

                /* Product Detail */
                .cosmic-detail-container {
                    grid-template-columns: 1fr !important;
                    gap: 30px !important;
                    padding: 15px !important;
                }
                
                .cosmic-detail-visuals {
                    height: auto !important;
                }
                
                .cosmic-detail-image {
                    height: 300px !important;
                }

                .cosmic-detail-title {
                    font-size: 2rem !important;
                }

                /* Cart */
                .cosmic-cart-container {
                    padding: 15px !important;
                }
                
                .cosmic-cart-item {
                    flex-direction: column;
                    align-items: flex-start !important;
                    gap: 15px !important;
                }
                
                .cosmic-cart-item-image {
                    width: 100% !important;
                    height: 150px !important;
                }

                .cosmic-cart-actions {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 10px;
                }
            }
        `;
        document.head.appendChild(style);

        return () => {
            link.remove();
            style.remove();
        };
    }, []);

    const handleSelectProduct = (product: Product) => {
        setSelectedProduct(product);
        setView('detail');
    };

    const handleBackToStore = () => {
        setSelectedProduct(null);
        setView('dashboard');
    };

    return (
        <div className="cosmic-app">
            <MagicMode /> {/* The Background */}

            {/* HUD Header */}
            <header className="cosmic-header">
                <div className="cosmic-header-left">
                    <Rocket size={32} color="#1119B4" />
                    <div>
                        <h1 style={{ margin: 0, fontFamily: '"Orbitron", sans-serif', fontSize: '1.5rem', textShadow: '0 0 10px #1119B4' }}>
                            USS TERRAZUL
                        </h1>
                        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>SYSTEMS: ONLINE</span>
                    </div>
                </div>

                <div className="cosmic-header-right">
                    <HUDButton
                        icon={<ShoppingBag />}
                        label={`CARGO (${cartCount})`}
                        onClick={() => setView(view === 'cargo' ? 'dashboard' : 'cargo')}
                        active={view === 'cargo'}
                    />
                    <HUDButton
                        icon={<X />}
                        label="EXIT SIMULATION"
                        onClick={toggleMagicMode}
                        danger
                    />
                </div>
            </header>

            {/* Main Viewport */}
            <main className="cosmic-main">
                <AnimatePresence mode="wait">
                    {view === 'dashboard' && (
                        <motion.div
                            key="store"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <CosmicStore onSelectProduct={handleSelectProduct} />
                        </motion.div>
                    )}

                    {view === 'detail' && selectedProduct && (
                        <motion.div
                            key="detail"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <CosmicProductDetail
                                product={selectedProduct}
                                onBack={handleBackToStore}
                            />
                        </motion.div>
                    )}

                    {view === 'cargo' && (
                        <motion.div
                            key="cargo"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                        >
                            <CosmicCart onBack={handleBackToStore} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* HUD Footer */}
            <footer style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                padding: '10px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                background: 'rgba(2, 4, 20, 0.9)',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                fontSize: '0.8rem',
                zIndex: 100
            }}>
                <span>COORDINATES: {Math.random().toFixed(4)} / {Math.random().toFixed(4)}</span>
                <span>VELOCITY: WARP 9.8</span>
            </footer>
        </div>
    );
}

const HUDButton = ({ icon, label, onClick, active, danger }: any) => (
    <motion.button
        whileHover={{ scale: 1.05, backgroundColor: danger ? 'rgba(255, 68, 68, 0.2)' : 'rgba(17, 25, 180, 0.2)' }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        style={{
            background: active ? 'rgba(17, 25, 180, 0.2)' : 'transparent',
            border: `1px solid ${danger ? '#ff4444' : '#ffffff'}`,
            color: danger ? '#ff4444' : '#ffffff',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: '"Share Tech Mono", monospace',
            cursor: 'pointer',
            boxShadow: active ? '0 0 15px rgba(17, 25, 180, 0.5)' : 'none'
        }}
    >
        {icon}
        {label}
    </motion.button>
);
