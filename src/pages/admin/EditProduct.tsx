import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/productService';
import type { Product } from '../../types/product';
import ProductForm from '../../components/admin/ProductForm';

import { Component, type ReactNode } from 'react';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean, error: Error | null }> {
    constructor(props: { children: ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', color: 'red', border: '1px solid red', margin: '20px' }}>
                    <h2>Something went wrong.</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}

export default function EditProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            console.log('EditProduct: Fetching product with id:', id);
            try {
                const data = await getProductById(id);
                console.log('EditProduct: Fetched data:', data);
                setProduct(data);
            } catch (error) {
                console.error('EditProduct: Error fetching product:', error);
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
            <ErrorBoundary>
                <ProductForm initialData={product} isEdit={true} />
            </ErrorBoundary>
        </div>
    );
}
