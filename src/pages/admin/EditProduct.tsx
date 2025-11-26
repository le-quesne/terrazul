import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/productService';
import type { Product } from '../../types/product';
import ProductForm from '../../components/admin/ProductForm';

export default function EditProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return <div style={{ padding: '50px', textAlign: 'center' }}>Cargando...</div>;
    }

    if (!product) {
        return <div style={{ padding: '50px', textAlign: 'center' }}>Producto no encontrado</div>;
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
            <ProductForm initialData={product} isEdit={true} />
        </div>
    );
}
