import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ActivityIndicator,
    ToastAndroid,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '~store/cart.store';
import { styles } from './styles';

interface OrderDetails {
    items: any[];
    subtotal: number;
    tax: number;
    total: number;
}

interface CheckoutScreenProps {
    navigation: any;
    route: any;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ navigation, route }) => {
    const { cartItems, getTotal } = useCartStore();
    const orderDetails: OrderDetails = route.params?.orderDetails || {
        items: cartItems,
        subtotal: getTotal() / 1.05,
        tax: getTotal() - getTotal() / 1.05,
        total: getTotal(),
    };

    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [loading, setLoading] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState('');

    const handlePlaceOrder = async () => {
        if (!email || !phoneNumber || !address || !city || !zipCode) {
            ToastAndroid.show('Please fill all shipping details', ToastAndroid.SHORT);
            return;
        }

        if (!cardNumber || !expiryDate || !cvv) {
            ToastAndroid.show('Please fill all payment details', ToastAndroid.SHORT);
            return;
        }

        try {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const newOrderId = `ORD-${Date.now()}`;
            setOrderId(newOrderId);
            setOrderPlaced(true);

            ToastAndroid.show(`Order placed successfully!\nOrder ID: ${newOrderId}`, ToastAndroid.SHORT);
        } catch (error) {
            console.log('error===>', error);
            ToastAndroid.show('Failed to place order. Please try again.', ToastAndroid.SHORT);

        } finally {
            setLoading(false);
        }
    };

    if (orderPlaced) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.successContainer}>
                    <View style={styles.successIcon}>
                        <Text style={styles.successIconText}>✓</Text>
                    </View>
                    <Text style={styles.successTitle}>Order Confirmed!</Text>
                    <Text style={styles.orderIdText}>Order ID: {orderId}</Text>

                    <View style={styles.successDetails}>
                        <Text style={styles.detailLabel}>We'll send you an email with order details</Text>
                        <Text style={styles.detailValue}>{email}</Text>

                        <Text style={styles.detailLabel} style={{ marginTop: 16 }}>
                            Delivery Address
                        </Text>
                        <Text style={styles.detailValue}>
                            {address}, {city} {zipCode}
                        </Text>

                        <Text style={styles.detailLabel} style={{ marginTop: 16 }}>
                            Estimated Delivery
                        </Text>
                        <Text style={styles.detailValue}>3-5 Business Days</Text>

                        <View style={styles.amountBox}>
                            <Text style={styles.amountLabel}>Order Total</Text>
                            <Text style={styles.amountValue}>₹{orderDetails.total.toFixed(2)}</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home' }],
                            });
                        }}
                    >
                        <Text style={styles.continueButtonText}>Continue Shopping</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Order Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <View style={styles.summaryBox}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Items ({orderDetails.items.length})</Text>
                            <Text style={styles.summaryValue}>₹{orderDetails.subtotal.toFixed(2)}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Tax (5%)</Text>
                            <Text style={styles.summaryValue}>₹{orderDetails.tax.toFixed(2)}</Text>
                        </View>
                        <View style={[styles.summaryRow, styles.totalRow]}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>₹{orderDetails.total.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>

                {/* Shipping Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Shipping Address</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        editable={!loading}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        placeholderTextColor="#999"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                        editable={!loading}
                    />

                    <TextInput
                        style={[styles.input, { minHeight: 80 }]}
                        placeholder="Delivery Address"
                        placeholderTextColor="#999"
                        value={address}
                        onChangeText={setAddress}
                        multiline
                        editable={!loading}
                    />

                    <View style={styles.row}>
                        <TextInput
                            style={[styles.input, styles.halfInput]}
                            placeholder="City"
                            placeholderTextColor="#999"
                            value={city}
                            onChangeText={setCity}
                            editable={!loading}
                        />
                        <TextInput
                            style={[styles.input, styles.halfInput]}
                            placeholder="ZIP Code"
                            placeholderTextColor="#999"
                            value={zipCode}
                            onChangeText={setZipCode}
                            keyboardType="numeric"
                            editable={!loading}
                        />
                    </View>
                </View>

                {/* Payment Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Information</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Card Number"
                        placeholderTextColor="#999"
                        value={cardNumber}
                        onChangeText={(text) => setCardNumber(text.replace(/\s/g, ''))}
                        keyboardType="numeric"
                        maxLength={16}
                        editable={!loading}
                    />

                    <View style={styles.row}>
                        <TextInput
                            style={[styles.input, styles.halfInput]}
                            placeholder="MM/YY"
                            placeholderTextColor="#999"
                            value={expiryDate}
                            onChangeText={setExpiryDate}
                            keyboardType="numeric"
                            maxLength={5}
                            editable={!loading}
                        />
                        <TextInput
                            style={[styles.input, styles.halfInput]}
                            placeholder="CVV"
                            placeholderTextColor="#999"
                            value={cvv}
                            onChangeText={setCvv}
                            keyboardType="numeric"
                            maxLength={4}
                            secureTextEntry
                            editable={!loading}
                        />
                    </View>

                    <View style={styles.securityNote}>
                        <Text style={styles.securityIcon}>🔒</Text>
                        <Text style={styles.securityText}>
                            Your payment information is secure and encrypted
                        </Text>
                    </View>
                </View>

                {/* Terms & Conditions */}
                <View style={styles.termsBox}>
                    <Text style={styles.termsText}>
                        By placing this order, you agree to our Terms of Service and Privacy Policy
                    </Text>
                </View>
            </ScrollView>

            {/* Place Order Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.placeOrderButton, loading && styles.buttonDisabled]}
                    onPress={handlePlaceOrder}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                        <>
                            <Text style={styles.placeOrderIcon}>🛒</Text>
                            <Text style={styles.placeOrderButtonText}>Place Order</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

