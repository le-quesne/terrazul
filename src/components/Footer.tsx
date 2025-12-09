import { Github, Instagram, Twitter, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-brand">
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: 'var(--text-heading)' }}>Terrazul</h3>
                    <p>Café de especialidad, tostado en Santiago.</p>
                </div>

                <div className="payment-icons">
                    <span className="payment-icon" title="Tarjeta de Crédito"><CreditCard /></span>
                    <span className="payment-icon" title="Transferencia">🏦</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: '#555' }}>
                        <Instagram size={24} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ color: '#555' }}>
                        <Twitter size={24} />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: '#555' }}>
                        <Github size={24} />
                    </a>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px', fontSize: '14px' }}>
                    <Link to="/">Inicio</Link>
                    <Link to="/tienda">Tienda</Link>
                    <Link to="/galeria">Galería</Link>
                    <a href="#contacto">Contacto</a>
                </div>

                <p style={{ opacity: 0.6 }}>&copy; {new Date().getFullYear()} Café Terrazul. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}
