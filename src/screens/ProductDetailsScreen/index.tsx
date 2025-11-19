import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
  Image,
  FlatList,
  ToastAndroid,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '~store/cart.store';
import { useWishlistStore } from '~store/wishlist.store';
import { Product } from '../../types/types';
import { productService } from '../../services/productService';
import { styles } from './styles';

interface ProductDetailsScreenProps {
  route: {
    params: {
      product: Product;
    };
  };
  navigation: any;
}

export const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const { product } = route.params;
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const price = typeof selectedVariant.price === 'number' ? selectedVariant.price : parseFloat(selectedVariant.price as any) || 0;
  const originalPrice = typeof selectedVariant.originalPrice === 'number' ? selectedVariant.originalPrice : parseFloat(selectedVariant.originalPrice as any);
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleAddToCart = useCallback(() => {
    addToCart(product, selectedVariant, quantity);
    Alert.alert('Success', `${quantity} item(s) added to cart!`, [
      {
        text: 'Continue Shopping',
        onPress: () => navigation.goBack(),
      },
      {
        text: 'View Cart',
        onPress: () => navigation.navigate('Cart'),
      },
    ]);
  }, [product, selectedVariant, quantity, addToCart, navigation]);

  const handleWishlist = useCallback(() => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      ToastAndroid.show('Removed from wishlist', ToastAndroid.SHORT);
    } else {
      addToWishlist(product.id);
      ToastAndroid.show('Added to wishlist', ToastAndroid.SHORT);
    }
  }, [product.id, inWishlist, addToWishlist, removeFromWishlist]);

  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        message: `Check out ${product.name} - ₹${price}`,
        title: product.name,
        url: product.image || undefined,
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  }, [product]);

  const handleIncreaseQuantity = () => {
    setQuantity((q) => q + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const renderVariantSelector = () => (
    <View style={styles.variantSection}>
      <Text style={styles.sectionTitle}>Select Variant</Text>
      <FlatList
        data={product.variants}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.variantButton,
              selectedVariant.id === item.id && styles.variantButtonActive,
            ]}
            onPress={() => setSelectedVariant(item)}
          >
            <Text
              style={[
                styles.variantButtonText,
                selectedVariant.id === item.id && styles.variantButtonTextActive,
              ]}
            >
              {item.name} - ₹{(typeof item.price === 'number' ? item.price : parseFloat(item.price as any) || 0).toFixed(2)}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  const renderQuantitySelector = () => (
    <View style={styles.quantitySection}>
      <Text style={styles.sectionTitle}>Quantity</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={handleDecreaseQuantity}
        >
          <Text style={styles.quantityButtonText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.quantityValue}>{quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={handleIncreaseQuantity}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSpecifications = () => {
    if (!product.specifications || Object.keys(product.specifications).length === 0) {
      return null;
    }

    return (
      <View style={styles.specsSection}>
        <Text style={styles.sectionTitle}>Specifications</Text>
        {Object.entries(product.specifications).map(([key, value]) => (
          <View key={key} style={styles.specRow}>
            <Text style={styles.specLabel}>{key}:</Text>
            <Text style={styles.specValue}>{value}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: productService.formatImageUrl(product.image) }}
            style={styles.image}
            resizeMode="cover"
          />
          {discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{discount}% OFF</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.infoSection}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>{product.name}</Text>
              {product.brand && <Text style={styles.brand}>{product.brand}</Text>}
            </View>
            <TouchableOpacity onPress={handleWishlist}>
              <Text style={styles.wishlistIcon}>{inWishlist ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </View>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {product.rating}</Text>
            <Text style={styles.reviews}>({product.reviewCount} reviews)</Text>
          </View>

          {/* Price */}
          <View style={styles.priceSection}>
            <Text style={styles.price}>₹{(typeof price === 'number' ? price : 0).toFixed(2)}</Text>
            {originalPrice && (
              <Text style={styles.originalPrice}>₹{(typeof originalPrice === 'number' ? originalPrice : 0).toFixed(2)}</Text>
            )}
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Stock Status */}
          <Text
            style={[
              styles.stock,
              { color: product.inStock ? '#4CAF50' : '#FF5252' },
            ]}
          >
            {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
          </Text>
        </View>

        {/* Variant Selector */}
        {product.variants.length > 1 && renderVariantSelector()}

        {/* Quantity Selector */}
        {renderQuantitySelector()}

        {/* Specifications */}
        {renderSpecifications()}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.shareButton, { marginRight: 8 }]}
          onPress={handleShare}
        >
          <Text style={styles.shareButtonText}>📤 Share</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.addToCartButton,
            !product.inStock && styles.addToCartButtonDisabled,
          ]}
          onPress={handleAddToCart}
          disabled={!product.inStock}
        >
          <Text style={styles.addToCartButtonText}>
            🛒 Add to Cart (₹{((typeof price === 'number' ? price : 0) * quantity).toFixed(2)})
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

