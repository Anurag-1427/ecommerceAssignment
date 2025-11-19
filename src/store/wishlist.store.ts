import { create } from 'zustand';
import { WishlistItem } from '../types/types';

interface WishlistStore {
    items: WishlistItem[];
    addToWishlist: (productId: string) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    loadWishlist: (items: WishlistItem[]) => void;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
    items: [],

    addToWishlist: (productId) => {
        set((state) => {
            if (!state.items.find((item) => item.productId === productId)) {
                return {
                    items: [...state.items, { productId, addedAt: Date.now() }],
                };
            }
            return state;
        });
    },

    removeFromWishlist: (productId) => {
        set((state) => ({
            items: state.items.filter((item) => item.productId !== productId),
        }));
    },

    isInWishlist: (productId) => {
        return get().items.some((item) => item.productId === productId);
    },

    loadWishlist: (items) => {
        set({ items });
    },
}));
