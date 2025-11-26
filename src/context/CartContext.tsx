import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product } from '../types/product';

export interface CartItem extends Product {
    cartId: string; // Unique ID for the cart item (product ID + options)
    quantity: number;
    selectedWeight?: string;
    selectedGrind?: string;
}

interface CartContextType {
    cart: CartItem[];
    isCartOpen: boolean;
    toggleCart: () => void;
    addToCart: (product: Product, quantity: number, weight?: string, grind?: string) => void;
    removeFromCart: (cartId: string) => void;
    updateQuantity: (cartId: string, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const toggleCart = () => setIsCartOpen(prev => !prev);

    const addToCart = (product: Product, quantity: number, selectedWeight?: string, selectedGrind?: string) => {
        const cartId = `${product.id}-${selectedWeight || 'default'}-${selectedGrind || 'default'}`;

        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.cartId === cartId);
            if (existingItem) {
                return prevCart.map(item =>
                    item.cartId === cartId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevCart, { ...product, cartId, quantity, selectedWeight, selectedGrind }];
            }
        });
        setIsCartOpen(true); // Open cart when adding item
    };

    const removeFromCart = (cartId: string) => {
        setCart(prevCart => prevCart.filter(item => item.cartId !== cartId));
    };

    const updateQuantity = (cartId: string, quantity: number) => {
        if (quantity < 1) return;
        setCart(prevCart => prevCart.map(item =>
            item.cartId === cartId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, item) => {
        // Use priceNumber which should be updated when adding to cart
        return total + (item.priceNumber * item.quantity);
    }, 0);

    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            isCartOpen,
            toggleCart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};
