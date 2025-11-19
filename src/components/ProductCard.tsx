import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
} from 'react-native';
import { Product } from '../types/types';
import { useCartStore } from '../store/cart.store';
import { useWishlistStore } from '../store/wishlist.store';
import { productService } from '../services/productService';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = async () => {
    const variant = product.variants[0];
    if (variant) {
      await addToCart(product, variant, 1);
      ToastAndroid.show('Added to cart!', ToastAndroid.SHORT);
    }
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const price = product.variants[0]?.price || 0;
  const originalPrice = product.variants[0]?.originalPrice;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: productService.formatImageUrl(product.image) }}
          style={styles.image}
          resizeMode="cover"
        />
        {originalPrice && price < originalPrice && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              {Math.round(((originalPrice - price) / originalPrice) * 100)}%
            </Text>
          </View>
        )}
      </View>

      {/* Product Info */}
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {product.rating}</Text>
          <Text style={styles.reviews}>({product.reviewCount})</Text>
        </View>

        {/* Price */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{price.toFixed(2)}</Text>
          {originalPrice && (
            <Text style={styles.originalPrice}>₹{originalPrice.toFixed(2)}</Text>
          )}
        </View>

        {/* Stock Status */}
        <Text
          style={[
            styles.stock,
            product.inStock ? styles.inStock : styles.outOfStock,
          ]}
        >
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </Text>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.cartButton]}
            onPress={handleAddToCart}
            disabled={!product.inStock}
          >
            <Text style={styles.cartButtonText}>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.wishlistButton]}
            onPress={handleWishlist}
          >
            <Text style={styles.wishlistButtonText}>{inWishlist ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 12,
    marginHorizontal: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 150,
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF5252',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 12,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FF9800',
    marginRight: 4,
  },
  reviews: {
    fontSize: 11,
    color: '#999',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF6B35',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  stock: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 8,
  },
  inStock: {
    color: '#4CAF50',
  },
  outOfStock: {
    color: '#FF5252',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartButton: {
    backgroundColor: '#FF6B35',
  },
  cartButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 12,
  },
  wishlistButton: {
    paddingHorizontal: 12,
    backgroundColor: '#F0F0F0',
  },
  wishlistButtonText: {
    fontSize: 16,
  },
});
