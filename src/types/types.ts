// Product Types
export interface ProductVariant {
    id: string;
    name: string;
    sku: string;
    price: number;
    originalPrice?: number;
    barcodes: string[];
}

export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    image: string | null;
    rating: number;
    reviewCount: number;
    inStock: boolean;
    variants: ProductVariant[];
    specifications?: Record<string, string>;
    brand?: string;
}

// Cart Types
export interface CartItem {
    product: Product;
    variant: ProductVariant;
    quantity: number;
    addedAt: number;
}

export interface Cart {
    items: CartItem[];
    lastUpdated: number;
}

// Wishlist Types
export interface WishlistItem {
    productId: string;
    addedAt: number;
}

// API Response Types
export interface ProductFilterRequest {
    page: number;
    limit?: number;
    search?: string;
    category?: string;
}

export interface ProductFilterResponse {
    data: {
        data: Product[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            hasMore: boolean;
        };
    };
}

// Scanner Types
export interface BarcodeResult {
    barcode: string;
    type: string;
}

