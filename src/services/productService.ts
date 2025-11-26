import { supabase } from '../lib/supabase';
import type { Product } from '../types/product';

export const getProducts = async (): Promise<Product[]> => {
    const { data, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        throw error;
    }

    return data.map((item: any) => mapDatabaseToProduct(item));
};

export const getProductById = async (id: string): Promise<Product | null> => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    if (!data) return null;

    return mapDatabaseToProduct(data);
};

export const createProduct = async (product: Omit<Product, 'id'> & { id?: string }): Promise<Product | null> => {
    // Generate ID from name if not provided
    const id = product.id || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const dbProduct = mapProductToDatabase({ ...product, id });

    const { data, error } = await supabase
        .from('products')
        .insert(dbProduct)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return mapDatabaseToProduct(data);
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product | null> => {
    const dbProduct = mapProductToDatabase(product);

    const { data, error } = await supabase
        .from('products')
        .update(dbProduct)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return mapDatabaseToProduct(data);
};

export const deleteProduct = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        throw error;
    }
};

// Helpers
const mapDatabaseToProduct = (item: any): Product => ({
    id: item.id,
    name: item.name,
    priceNumber: item.price_number,
    prices: item.prices,
    img: item.img,
    isNew: item.is_new,
    description: item.description,
    region: item.region,
    roastLevel: item.roast_level,
    tastingNotes: item.tasting_notes,
    acidity: item.acidity,
    intensity: item.intensity,
    bitterness: item.bitterness,
    grindOptions: item.grind_options,
    tastingProfileImage: item.tasting_profile_image,
    artInfo: item.art_info,
});

const mapProductToDatabase = (product: any) => {
    const dbProduct: any = {};
    if (product.id !== undefined) dbProduct.id = product.id;
    if (product.name !== undefined) dbProduct.name = product.name;
    if (product.priceNumber !== undefined) dbProduct.price_number = product.priceNumber;
    if (product.prices !== undefined) dbProduct.prices = product.prices;
    if (product.img !== undefined) dbProduct.img = product.img;
    if (product.isNew !== undefined) dbProduct.is_new = product.isNew;
    if (product.description !== undefined) dbProduct.description = product.description;
    if (product.region !== undefined) dbProduct.region = product.region;
    if (product.roastLevel !== undefined) dbProduct.roast_level = product.roastLevel;
    if (product.tastingNotes !== undefined) dbProduct.tasting_notes = product.tastingNotes;
    if (product.acidity !== undefined) dbProduct.acidity = product.acidity;
    if (product.intensity !== undefined) dbProduct.intensity = product.intensity;
    if (product.bitterness !== undefined) dbProduct.bitterness = product.bitterness;
    if (product.grindOptions !== undefined) dbProduct.grind_options = product.grindOptions;
    if (product.tastingProfileImage !== undefined) dbProduct.tasting_profile_image = product.tastingProfileImage;
    if (product.artInfo !== undefined) dbProduct.art_info = product.artInfo;
    return dbProduct;
};

export const uploadProductImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

    if (uploadError) {
        throw uploadError;
    }

    const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

    return data.publicUrl;
};
