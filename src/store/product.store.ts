import { create } from 'zustand';
import { Product } from '../types/types';

interface ProductStore {
    products: Product[];
    loading: boolean;
    error: string | null;
    page: number;
    hasMore: boolean;
    setProducts: (products: Product[]) => void;
    addProducts: (products: Product[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setPage: (page: number) => void;
    setHasMore: (hasMore: boolean) => void;
    reset: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,

    setProducts: (products) => set({ products }),
    addProducts: (products) => set((state) => ({ products: [...state.products, ...products] })),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setPage: (page) => set({ page }),
    setHasMore: (hasMore) => set({ hasMore }),
    reset: () =>
        set({
            products: [],
            loading: false,
            error: null,
            page: 1,
            hasMore: true,
        }),
}));
