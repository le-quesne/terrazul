import { Link } from 'react-router-dom';
import { Search, User, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Header() {
    const { toggleCart, cartCount } = useCart();

    return (
        <header className="header">
            <div className="container nav">
                <div className="nav-icons-left">
                    <button className="btn-icon"><Search size={20} /></button>
                </div>

                <div className="logo">
                    <Link to="/">
                        <img src="/logo.png" alt="Terrazul" />
                    </Link>
                </div>

                <div className="nav-icons">
                    <a href="#account"><User size={20} /></a>
                    <button
                        className="btn-icon"
                        onClick={toggleCart}
                        style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
                    >
                        <ShoppingBag size={20} />
                        {cartCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                backgroundColor: '#ff4444',
                                color: 'white',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid var(--primary-blue)'
                            }}>
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
            <div className="container nav-links-container">
                <nav className="nav-links">
                    <Link to="/">Inicio</Link>
                    <Link to="/tienda">Tienda</Link>
                    <a href="#contacto">Contacto</a>
                </nav>
            </div>
        </header>
    );
}
