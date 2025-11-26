import { useProducts } from '../../hooks/useProducts';
import { useAuth } from '../../context/AuthContext';
import { deleteProduct } from '../../services/productService';
import { LogOut, Plus, Edit, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';


export default function Dashboard() {
    const { products, loading } = useProducts(); // Note: In a real app we'd want a way to refresh this list
    const { signOut, user } = useAuth();
    const navigate = useNavigate();

    const handleDelete = async (id: string) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            try {
                await deleteProduct(id);
                window.location.reload(); // Simple reload to refresh list
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Error al eliminar el producto');
            }
        }
    };

    if (loading) {
        return <div style={{ padding: '50px', textAlign: 'center' }}>Cargando panel...</div>;
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
            {/* Top Bar */}
            <header style={{ backgroundColor: 'white', borderBottom: '1px solid #eee', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <h1 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-blue)' }}>Terrazul Admin</h1>
                    <span style={{ fontSize: '0.9rem', color: '#666', borderLeft: '1px solid #ddd', paddingLeft: '15px' }}>
                        {user?.email}
                    </span>
                </div>
                <button
                    onClick={signOut}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#666',
                        fontSize: '0.9rem'
                    }}
                >
                    <LogOut size={16} /> Salir
                </button>
            </header>

            <div className="container" style={{ padding: '40px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '1.8rem', color: 'var(--text-heading)' }}>Productos</h2>
                    <Link to="/admin/products/new" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                        <Plus size={18} /> Nuevo Producto
                    </Link>
                </div>

                <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #eee' }}>
                            <tr>
                                <th style={{ padding: '15px', textAlign: 'left', fontSize: '0.9rem', color: '#666' }}>Producto</th>
                                <th style={{ padding: '15px', textAlign: 'left', fontSize: '0.9rem', color: '#666' }}>Precio</th>
                                <th style={{ padding: '15px', textAlign: 'left', fontSize: '0.9rem', color: '#666' }}>Región</th>
                                <th style={{ padding: '15px', textAlign: 'right', fontSize: '0.9rem', color: '#666' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <img
                                            src={product.img}
                                            alt={product.name}
                                            style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '4px', background: '#f9f9f9' }}
                                        />
                                        <div>
                                            <div style={{ fontWeight: 500 }}>{product.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#888' }}>{product.id}</div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(product.priceNumber)}
                                    </td>
                                    <td style={{ padding: '15px' }}>{product.region || '-'}</td>
                                    <td style={{ padding: '15px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <button
                                                onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                                                style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', color: '#666' }}
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                style={{ padding: '6px', borderRadius: '4px', border: '1px solid #fee', background: '#fff5f5', cursor: 'pointer', color: '#c62828' }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
