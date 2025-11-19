import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem, Cart, Product, ProductVariant } from '../types/types';

interface CartStore {
    cart: Cart;
    addToCart: (product: Product, variant: ProductVariant, quantity: number) => Promise<void>;
    removeFromCart: (productId: string, variantId: string) => Promise<void>;
    updateQuantity: (productId: string, variantId: string, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    getTotal: () => number;
    getItemCount: () => number;
    loadCart: (cart: Cart) => void;
    initializeCart: () => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => ({
    cart: {
        items: [],
        lastUpdated: Date.now(),
    },

    initializeCart: async () => {
        try {
            const savedCart = await AsyncStorage.getItem('cart');
            if (savedCart) {
                set({ cart: JSON.parse(savedCart) });
            }
        } catch (error) {
            console.error('Failed to load cart:', error);
        }
    },

    addToCart: async (product, variant, quantity) => {
        set((state) => {
            const existingItem = state.cart.items.find(
                (item) => item.product.id === product.id && item.variant.id === variant.id
            );

            let updatedItems: CartItem[];
            if (existingItem) {
                updatedItems = state.cart.items.map((item) =>
                    item.product.id === product.id && item.variant.id === variant.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                updatedItems = [
                    ...state.cart.items,
                    { product, variant, quantity, addedAt: Date.now() },
                ];
            }

            const newCart = {
                items: updatedItems,
                lastUpdated: Date.now(),
            };

            AsyncStorage.setItem('cart', JSON.stringify(newCart)).catch(error =>
                console.error('Failed to save cart:', error)
            );

            return { cart: newCart };
        });
    },

    removeFromCart: async (productId, variantId) => {
        set((state) => {
            const newCart = {
                items: state.cart.items.filter(
                    (item) => !(item.product.id === productId && item.variant.id === variantId)
                ),
                lastUpdated: Date.now(),
            };

            AsyncStorage.setItem('cart', JSON.stringify(newCart)).catch(error =>
                console.error('Failed to save cart:', error)
            );

            return { cart: newCart };
        });
    },

    updateQuantity: async (productId, variantId, quantity) => {
        set((state) => {
            const newCart = {
                items: state.cart.items.map((item) =>
                    item.product.id === productId && item.variant.id === variantId
                        ? { ...item, quantity: Math.max(0, quantity) }
                        : item
                ),
                lastUpdated: Date.now(),
            };

            AsyncStorage.setItem('cart', JSON.stringify(newCart)).catch(error =>
                console.error('Failed to save cart:', error)
            );

            return { cart: newCart };
        });
    },

    clearCart: async () => {
        const newCart = {
            items: [],
            lastUpdated: Date.now(),
        };

        set({ cart: newCart });

        try {
            await AsyncStorage.removeItem('cart');
        } catch (error) {
            console.error('Failed to clear cart:', error);
        }
    },

    getTotal: () => {
        const cartTotal = get().cart.items.reduce((sum, item) => {
            const price = typeof item.variant.price === 'number' ? item.variant.price : parseFloat(item.variant.price as any) || 0;
            const quantity = typeof item.quantity === 'number' ? item.quantity : parseInt(item.quantity as any, 10) || 0;
            return sum + (price * quantity);
        }, 0);
        return isNaN(cartTotal) ? 0 : cartTotal;
    },

    getItemCount: () => {
        return get().cart.items.reduce((count, item) => {
            const quantity = typeof item.quantity === 'number' ? item.quantity : parseInt(item.quantity as any, 10) || 0;
            return count + quantity;
        }, 0);
    },

    loadCart: (cart) => {
        set({ cart });
    },
}));
