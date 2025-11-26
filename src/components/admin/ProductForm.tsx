import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types/product';
import { createProduct, updateProduct, uploadProductImage } from '../../services/productService';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { TagInput } from '../ui/TagInput';

interface ProductFormProps {
    initialData?: Product;
    isEdit?: boolean;
}

export default function ProductForm({ initialData, isEdit = false }: ProductFormProps) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        priceNumber: 0,
        description: '',
        region: '',
        roastLevel: '',
        img: '',
        tastingNotes: initialData?.tastingNotes || [],
        grindOptions: ['Grano entero', 'Molido fino', 'Molido medio', 'Molido grueso'],
        prices: { '250g': 0, '1kg': 0 },
        ...initialData
    });

    // Separate states for prices to handle them explicitly
    const [price250g, setPrice250g] = useState<number>(initialData?.prices?.['250g'] || initialData?.priceNumber || 0);
    const [price1kg, setPrice1kg] = useState<number>(initialData?.prices?.['1kg'] || (initialData?.priceNumber ? initialData.priceNumber * 3 : 0));

    // Image States
    const [mainImageFile, setMainImageFile] = useState<File | null>(null);
    const [mainImagePreview, setMainImagePreview] = useState<string>(initialData?.img || '');

    const [tastingProfileFile, setTastingProfileFile] = useState<File | null>(null);
    const [tastingProfilePreview, setTastingProfilePreview] = useState<string>(initialData?.tastingProfileImage || '');

    const [artFile, setArtFile] = useState<File | null>(null);
    const [artPreview, setArtPreview] = useState<string>(initialData?.artInfo?.illustration || '');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: Number(value) }));
    };

    const handleArtInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            artInfo: {
                ...prev.artInfo,
                [name]: value,
                // Ensure required fields exist to avoid TS errors if artInfo was undefined
                title: prev.artInfo?.title || '',
                description: prev.artInfo?.description || '',
                artistName: prev.artInfo?.artistName || '',
                artistDescription: prev.artInfo?.artistDescription || '',
            } as any
        }));
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setFile: (f: File | null) => void,
        setPreview: (s: string) => void
    ) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFile(file);
            setPreview(URL.createObjectURL(file));
        } else {
            setFile(null);
            setPreview('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Upload images if new files selected
            let mainImageUrl = formData.img;
            if (mainImageFile) {
                mainImageUrl = await uploadProductImage(mainImageFile);
            }

            let tastingProfileUrl = formData.tastingProfileImage;
            if (tastingProfileFile) {
                tastingProfileUrl = await uploadProductImage(tastingProfileFile);
            }

            let artIllustrationUrl = formData.artInfo?.illustration;
            if (artFile) {
                artIllustrationUrl = await uploadProductImage(artFile);
            }

            const productData: Product = {
                ...formData as Product,
                img: mainImageUrl || '',
                tastingProfileImage: tastingProfileUrl,
                artInfo: formData.artInfo ? {
                    ...formData.artInfo,
                    illustration: artIllustrationUrl
                } : undefined,
                prices: {
                    '250g': price250g,
                    '1kg': price1kg
                },
                priceNumber: price250g // Base price for sorting/display
            };

            if (isEdit && initialData?.id) {
                await updateProduct(initialData.id, productData);
            } else {
                await createProduct(productData as any);
            }
            navigate('/admin');
        } catch (err: any) {
            setError(err.message || 'Error al guardar el producto');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
            <button
                onClick={() => navigate('/admin')}
                style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '20px', color: '#666' }}
            >
                <ArrowLeft size={18} /> Volver
            </button>

            <h1 style={{ marginBottom: '30px', fontSize: '2rem' }}>{isEdit ? 'Editar Producto' : 'Nuevo Producto'}</h1>

            {error && (
                <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* Basic Info */}
                <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Información Básica</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Nombre</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Precio 250g (CLP)</label>
                            <input
                                type="number"
                                value={price250g}
                                onChange={(e) => setPrice250g(Number(e.target.value))}
                                required
                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Precio 1kg (CLP)</label>
                            <input
                                type="number"
                                value={price1kg}
                                onChange={(e) => setPrice1kg(Number(e.target.value))}
                                required
                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Descripción</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={4}
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontFamily: 'inherit' }}
                        />
                    </div>
                </div>

                {/* Details */}
                <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Detalles del Café</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Región</label>
                            <input
                                name="region"
                                value={formData.region}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Nivel de Tostado</label>
                            <input
                                name="roastLevel"
                                value={formData.roastLevel}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <TagInput
                            label="Notas de Cata (Presiona Enter para agregar)"
                            value={formData.tastingNotes || []}
                            onChange={(tags) => setFormData(prev => ({ ...prev, tastingNotes: tags }))}
                            placeholder="Ej: Chocolate, Nuez"
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Acidez (1-5)</label>
                            <input
                                name="acidity"
                                type="number"
                                min="1" max="5"
                                value={formData.acidity || 3}
                                onChange={handleNumberChange}
                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Intensidad (1-5)</label>
                            <input
                                name="intensity"
                                type="number"
                                min="1" max="5"
                                value={formData.intensity || 3}
                                onChange={handleNumberChange}
                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Amargor (1-5)</label>
                            <input
                                name="bitterness"
                                type="number"
                                min="1" max="5"
                                value={formData.bitterness || 3}
                                onChange={handleNumberChange}
                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Imagen Perfil de Cata</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            {tastingProfilePreview && (
                                <img src={tastingProfilePreview} alt="Tasting Profile" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, setTastingProfileFile, setTastingProfilePreview)}
                            />
                        </div>
                    </div>
                </div>

                {/* Art Info */}
                <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Información de Arte</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Título de la Obra</label>
                            <input
                                name="title"
                                value={formData.artInfo?.title || ''}
                                onChange={handleArtInfoChange}
                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Nombre del Artista</label>
                            <input
                                name="artistName"
                                value={formData.artInfo?.artistName || ''}
                                onChange={handleArtInfoChange}
                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Descripción de la Obra</label>
                        <textarea
                            name="description"
                            value={formData.artInfo?.description || ''}
                            onChange={handleArtInfoChange}
                            rows={3}
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontFamily: 'inherit' }}
                        />
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Descripción del Artista</label>
                        <textarea
                            name="artistDescription"
                            value={formData.artInfo?.artistDescription || ''}
                            onChange={handleArtInfoChange}
                            rows={3}
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontFamily: 'inherit' }}
                        />
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Ilustración (Imagen)</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            {artPreview && (
                                <img src={artPreview} alt="Art Illustration" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, setArtFile, setArtPreview)}
                            />
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Imágenes</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <label style={{ display: 'block', fontWeight: 500 }}>Imagen del Producto</label>

                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                            {mainImagePreview && (
                                <div style={{ width: '100px', height: '100px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ddd', background: '#f9f9f9' }}>
                                    <img src={mainImagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            )}

                            <div style={{ flex: 1 }}>
                                <label
                                    htmlFor="file-upload"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '10px 15px',
                                        background: '#f0f0f0',
                                        border: '1px solid #ddd',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    <Upload size={18} /> Seleccionar Imagen
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, setMainImageFile, setMainImagePreview)}
                                    style={{ display: 'none' }}
                                />
                                <p style={{ marginTop: '8px', fontSize: '0.8rem', color: '#888' }}>
                                    {mainImageFile ? mainImageFile.name : 'Sube una imagen (JPG, PNG, WEBP)'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ padding: '15px', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
                >
                    <Save size={20} /> {loading ? 'Guardando...' : 'Guardar Producto'}
                </button>

            </form>
        </div>
    );
}
