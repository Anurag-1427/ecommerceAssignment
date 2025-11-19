import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/auth.store';
import { signOutGoogle } from '../../auth/GoogleAuth';
import { styles } from './styles';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await signOutGoogle();
      await logout();
    } catch (error) {
      Alert.alert('Error', `Logout failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const menuItems = [
    { id: 1, title: '🛍️ Shop', subtitle: 'Browse all products', screen: 'ProductsListing' },
    { id: 2, title: '📦 Cart', subtitle: 'View your cart', screen: 'Cart' },
    { id: 3, title: '📱 Scan Barcode', subtitle: 'Scan products', screen: 'BarcodeScanner' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.userInfoContainer}>
            {user?.photo ? (
              <Image source={{ uri: user.photo }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarPlaceholderText}>👤</Text>
              </View>
            )}
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Welcome, {user?.name?.split(' ')[0]}!</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.menuGrid}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => navigation.navigate(item.screen)}
              >
                <Text style={styles.menuIcon}>{item.title.split(' ')[0]}</Text>
                <Text style={styles.menuItemTitle}>{item.title.split(' ')[1]}</Text>
                <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Shop With Us?</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🚚</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Fast Delivery</Text>
                <Text style={styles.featureDescription}>Get products in 3-5 days</Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>💯</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Quality Assured</Text>
                <Text style={styles.featureDescription}>100% authentic products</Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🔒</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Secure Payment</Text>
                <Text style={styles.featureDescription}>Safe and encrypted checkout</Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📞</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>24/7 Support</Text>
                <Text style={styles.featureDescription}>Customer support always available</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Promo Banner */}
        <View style={styles.promoBanner}>
          <Text style={styles.promoIcon}>🎉</Text>
          <Text style={styles.promoTitle}>Special Offer!</Text>
          <Text style={styles.promoText}>Get 10% off on your first order</Text>
          <TouchableOpacity
            style={styles.promoButton}
            onPress={() => navigation.navigate('ProductsListing')}
          >
            <Text style={styles.promoButtonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>App Version 1.0.0</Text>
          <Text style={styles.infoText}>Scan barcodes, browse products, and checkout seamlessly</Text>
        </View>
      </ScrollView>

      {/* Logout Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

