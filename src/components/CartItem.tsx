import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CartItem as CartItemType } from '../types/types';
import { useCartStore } from '~store/cart.store';
import { productService } from '../services/productService';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCartStore();

  const handleIncrease = async () => {
    await updateQuantity(item.product.id, item.variant.id, item.quantity + 1);
  };

  const handleDecrease = async () => {
    if (item.quantity > 1) {
      await updateQuantity(item.product.id, item.variant.id, item.quantity - 1);
    }
  };

  const handleRemove = async () => {
    await removeFromCart(item.product.id, item.variant.id);
  };

  const itemTotal = (typeof item.variant.price === 'number' ? item.variant.price : parseFloat(item.variant.price as any) || 0) * item.quantity;

  return (
    <View style={styles.container}>
      {/* Product Image */}
      <Image
        source={{ uri: productService.formatImageUrl(item.product.image) }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Product Info */}
      <View style={styles.content}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.product.name}
        </Text>
        <Text style={styles.variant}>{item.variant.name}</Text>
        <Text style={styles.price}>₹{(typeof item.variant.price === 'number' ? item.variant.price : parseFloat(item.variant.price as any) || 0).toFixed(2)} each</Text>

        {/* Quantity Controls */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={handleDecrease}
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={handleIncrease}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Total & Remove */}
      <View style={styles.rightSection}>
        <Text style={styles.total}>₹{itemTotal.toFixed(2)}</Text>
        <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    marginHorizontal: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  variant: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  quantityButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    minWidth: 30,
    textAlign: 'center',
  },
  rightSection: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  total: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF6B35',
  },
  removeButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  removeButtonText: {
    fontSize: 12,
    color: '#FF5252',
    fontWeight: '600',
  },
});
