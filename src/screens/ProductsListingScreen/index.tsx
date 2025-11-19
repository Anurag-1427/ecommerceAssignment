import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProductStore } from '~store/product.store';
import { useCartStore } from '~store/cart.store';
import { productService } from '../../services/productService';
import { ProductCard } from '../../components/ProductCard';
import { SearchBar } from '../../components/SearchBar';
import { Product } from '../../types/types';
import { styles } from './styles';

interface ProductsListingScreenProps {
  navigation: any;
}

const ITEMS_PER_PAGE = 10;
const GRID_COLUMNS = 2;

export const ProductsListingScreen: React.FC<ProductsListingScreenProps> = ({
  navigation,
}) => {
  const {
    products,
    loading,
    error,
    page,
    hasMore,
    setProducts,
    addProducts,
    setLoading,
    setError,
    setPage,
    setHasMore,
    reset,
  } = useProductStore();

  const { getItemCount, initializeCart } = useCartStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const searchTimeoutRef = useRef<any>(null);

  const loadProducts = useCallback(async (pageNum: number, query: string) => {
    try {
      setLoading(true);
      const response = await productService.filterProducts({
        page: pageNum,
        limit: ITEMS_PER_PAGE,
        search: query || undefined,
      });

      if (response.data?.data) {
        if (pageNum === 1) {
          setProducts(response.data.data);
        } else {
          addProducts(response.data.data);
        }

        setPage(pageNum);
        setHasMore(response.data.pagination?.hasMore || false);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [setProducts, addProducts, setLoading, setError, setPage, setHasMore]);

  // Load initial products and cart
  useEffect(() => {
    initializeCart();
    loadProducts(1, '');
  }, [loadProducts, initializeCart]);

  // Update header with cart button
  useEffect(() => {
    const cartCount = getItemCount();
    const handleCartPress = () => navigation.navigate('Cart');
    
    if (cartCount >= 0) {
      navigation.setOptions({
        headerRight: () => <CartHeaderButton cartCount={cartCount} onPress={handleCartPress} />,
      });
    }
  }, [navigation]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce search
    searchTimeoutRef.current = setTimeout(() => {
      reset();
      loadProducts(1, query);
    }, 500);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    reset();
    await loadProducts(1, searchQuery);
  };

  const handleLoadMore = () => {
    if (hasMore && !loading && products.length > 0) {
      loadProducts(page + 1, searchQuery);
    }
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetails', { product });
  };

  const renderProductCard = ({ item }: { item: Product }) => (
    <ProductCard product={item} onPress={() => handleProductPress(item)} />
  );

  const renderHeader = () => (
    <>
      <SearchBar onSearch={handleSearch} />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );

  const renderFooter = () => {
    if (!loading || page === 1) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No products found</Text>
      <TouchableOpacity
        style={styles.retryButton}
        onPress={() => loadProducts(1, searchQuery)}
      >
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading && page === 1) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={products}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        numColumns={GRID_COLUMNS}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#FF6B35']}
            tintColor="#FF6B35"
          />
        }
        removeClippedSubviews
        maxToRenderPerBatch={10}
        windowSize={10}
        scrollEventThrottle={400}
      />
    </SafeAreaView>
  );
};

const CartHeaderButton: React.FC<{ cartCount: number; onPress: () => void }> = ({
  cartCount,
  onPress,
}) => (
  <TouchableOpacity style={styles.cartButton} onPress={onPress}>
    <Text style={styles.cartIcon}>🛒</Text>
    {cartCount > 0 && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{cartCount}</Text>
      </View>
    )}
  </TouchableOpacity>
);

