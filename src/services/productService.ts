import { API_BASE_URL } from 'constants/constants';
import { Product, ProductFilterResponse, ProductFilterRequest } from '../types/types';

class ProductService {
    async filterProducts(request: ProductFilterRequest): Promise<ProductFilterResponse> {
        try {
            const payload = {
                page: request.page.toString(),
                pageSize: (request.limit || 10).toString(),
                sort: {
                    creationDateSortOption: 'DESC',
                },
            };

            const response = await fetch(`${API_BASE_URL}/filter/product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'x-internal-call': 'true',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    async searchByBarcode(barcode: string): Promise<Product | null> {
        try {
            const payload = {
                page: '1',
                pageSize: '100',
                sort: {
                    creationDateSortOption: 'DESC',
                },
            };

            const response = await fetch(`${API_BASE_URL}/filter/product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'x-internal-call': 'true',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data: ProductFilterResponse = await response.json();

            if (data.data?.data) {
                for (const product of data.data.data) {
                    for (const variant of product.variants) {
                        if (variant.barcodes.includes(barcode)) {
                            return product;
                        }
                    }
                }
            }

            return null;
        } catch (error) {
            console.error('Error searching barcode:', error);
            throw error;
        }
    }

    formatImageUrl(image: string | null): string {
        if (!image) {
            return 'https://via.placeholder.com/200x200?text=No+Image';
        }
        return image;
    }
}

export const productService = new ProductService();
