import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, CreditCard, ArrowLeft } from 'lucide-react';

export default function CosmicCart({ onBack }: { onBack: () => void }) {
    const { cart, removeFromCart, clearCart, cartTotal } = useCart();

    return (
        <div className="cosmic-cart-container" style={{ maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                <button
                    onClick={onBack}
                    style={{
                        background: 'transparent',
                        border: '1px solid #1119B4',
                        color: '#1119B4',
                        padding: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <ArrowLeft />
                </button>
                <h2 style={{ fontFamily: '"Orbitron", sans-serif', margin: 0 }}>CARGO MANIFEST</h2>
            </div>

            {cart.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '50px',
                    border: '1px dashed rgba(255,255,255,0.2)',
                    background: 'rgba(2, 4, 20, 0.5)'
                }}>
                    <p>CARGO HOLD EMPTY</p>
                    <button
                        onClick={onBack}
                        style={{
                            marginTop: '20px',
                            background: '#1119B4',
                            border: 'none',
                            padding: '10px 20px',
                            color: '#fff',
                            fontFamily: '"Share Tech Mono", monospace',
                            cursor: 'pointer'
                        }}
                    >
                        ACQUIRE SUPPLIES
                    </button>
                </div>
            ) : (
                <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <AnimatePresence>
                            {cart.map((item) => (
                                <motion.div
                                    key={item.cartId}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="cosmic-cart-item"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        background: 'rgba(17, 25, 180, 0.1)',
                                        border: '1px solid rgba(17, 25, 180, 0.3)',
                                        padding: '15px',
                                        gap: '20px'
                                    }}
                                >
                                    <div className="cosmic-cart-item-image" style={{
                                        width: '60px',
                                        height: '60px',
                                        background: `url("${item.img}") center/cover`,
                                        filter: 'sepia(100%) hue-rotate(190deg) saturate(150%)',
                                        border: '1px solid rgba(255,255,255,0.2)'
                                    }} />

                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ margin: '0 0 5px 0', fontFamily: '"Orbitron", sans-serif', fontSize: '1rem' }}>
                                            {item.name}
                                        </h3>
                                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                                            UNIT: {item.selectedWeight || '250g'} | QTY: {item.quantity}
                                        </div>
                                    </div>

                                    <div className="cosmic-cart-actions">
                                        <div style={{ fontFamily: '"Orbitron", sans-serif', color: '#1119B4' }}>
                                            {(item.prices?.[item.selectedWeight || '250g'] || item.priceNumber) * item.quantity} CR
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.cartId)}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                color: '#ff4444',
                                                cursor: 'pointer',
                                                padding: '5px'
                                            }}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div style={{
                        marginTop: '30px',
                        borderTop: '1px solid rgba(255,255,255,0.2)',
                        paddingTop: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <button
                            onClick={clearCart}
                            style={{
                                background: 'transparent',
                                border: '1px solid #ff4444',
                                color: '#ff4444',
                                padding: '10px 20px',
                                fontFamily: '"Share Tech Mono", monospace',
                                cursor: 'pointer'
                            }}
                        >
                            JETTISON CARGO
                        </button>

                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '5px' }}>TOTAL CREDITS</div>
                            <div style={{ fontSize: '2rem', fontFamily: '"Orbitron", sans-serif', color: '#1119B4' }}>
                                {cartTotal} CR
                            </div>
                        </div>
                    </div>

                    <button
                        style={{
                            width: '100%',
                            marginTop: '20px',
                            background: '#1119B4',
                            border: '1px solid #fff',
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
                        <CreditCard />
                        INITIATE TRANSACTION
                    </button>
                </>
            )}
        </div>
    );
}
