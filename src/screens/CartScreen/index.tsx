import React, { useCallback } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '~store/cart.store';
import { CartItem } from '../../components/CartItem';
import * as Keychain from 'react-native-keychain';
import { styles } from './styles';

interface CartScreenProps {
  navigation: any;
}

export const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const { cart, getTotal, getItemCount } = useCartStore();

  const total = getTotal();
  const itemCount = getItemCount();
  const subtotal = typeof total === 'number' ? total : 0;
  const tax = subtotal * 0.05; // 5% tax
  const finalTotal = subtotal + tax;

  const handleCheckout = useCallback(async () => {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: 'com.ecommerceassignment.auth',
      });

      if (credentials) {
        navigation.navigate('Checkout', {
          orderDetails: {
            items: cart.items,
            subtotal,
            tax,
            total: finalTotal,
          },
        });
      } else {
        Alert.alert('Login Required', 'Please login first');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      ToastAndroid.show('Error proceeding to checkout', ToastAndroid.SHORT);
    }
  }, [navigation, cart.items, subtotal, tax, finalTotal]);

  const handleContinueShopping = () => {
    navigation.navigate('ProductsListing');
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🛒</Text>
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptyText}>Add some products to get started!</Text>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinueShopping}
      >
        <Text style={styles.continueButtonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {cart.items.length === 0 ? (
        renderEmpty()
      ) : (
        <>
          {/* Cart Items List */}
          <FlatList
            data={cart.items}
            renderItem={({ item }) => <CartItem item={item} />}
            keyExtractor={(item) => `${item.product.id}-${item.variant.id}`}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            style={styles.listContainer}
          />

          {/* Price Breakdown */}
          <View style={styles.priceBreakdown}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Subtotal</Text>
              <Text style={styles.priceValue}>₹{subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Tax (5%)</Text>
              <Text style={styles.priceValue}>₹{tax.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={[styles.priceRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{finalTotal.toFixed(2)}</Text>
            </View>

            {/* Checkout Button */}
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>
                Proceed to Checkout ({itemCount} items)
              </Text>
            </TouchableOpacity>

            {/* Continue Shopping */}
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinueShopping}
            >
              <Text style={styles.continueButtonText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};
