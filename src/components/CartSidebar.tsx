import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CartSidebar.css';
import { useNavigate } from 'react-router-dom';

export default function CartSidebar() {
    const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
    };

    if (!isCartOpen) return null;

    return (
        <>
            <div className={`cart-sidebar-overlay ${isCartOpen ? 'open' : ''}`} onClick={toggleCart}></div>
            <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>Tu Carrito</h2>
                    <button className="close-cart" onClick={toggleCart}>
                        <X size={24} />
                    </button>
                </div>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <ShoppingBag size={48} style={{ marginBottom: '15px', opacity: 0.5 }} />
                            <p>Tu carrito está vacío</p>
                            <button
                                className="btn-small"
                                style={{ marginTop: '15px' }}
                                onClick={() => {
                                    toggleCart();
                                    navigate('/tienda');
                                }}
                            >
                                Ir a la tienda
                            </button>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.cartId} className="cart-item">
                                <img src={item.img} alt={item.name} className="cart-item-img" />
                                <div className="cart-item-details">
                                    <span className="cart-item-title">{item.name}</span>
                                    <div className="cart-item-options">
                                        {item.selectedWeight && <span>{item.selectedWeight}</span>}
                                        {item.selectedGrind && <span> • {item.selectedGrind}</span>}
                                    </div>
                                    <div className="cart-item-price">
                                        {formatPrice((item.priceNumber || 0) * item.quantity)}
                                    </div>

                                    <div className="cart-item-controls">
                                        <div className="quantity-control">
                                            <button
                                                className="quantity-btn"
                                                onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                            >-</button>
                                            <span className="quantity-value">{item.quantity}</span>
                                            <button
                                                className="quantity-btn"
                                                onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                            >+</button>
                                        </div>
                                        <button
                                            className="remove-btn"
                                            onClick={() => removeFromCart(item.cartId)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>Total</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>
                        <button className="checkout-btn">
                            Proceder al pago
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
