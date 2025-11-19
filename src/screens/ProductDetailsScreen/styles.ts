import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 300,
        backgroundColor: '#F5F5F5',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    discountBadge: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: '#FF5252',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    discountText: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 14,
    },
    infoSection: {
        padding: 16,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    productName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    brand: {
        fontSize: 12,
        color: '#999',
    },
    wishlistIcon: {
        fontSize: 28,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    rating: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FF9800',
        marginRight: 8,
    },
    reviews: {
        fontSize: 12,
        color: '#999',
    },
    priceSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    price: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FF6B35',
        marginRight: 12,
    },
    originalPrice: {
        fontSize: 16,
        color: '#999',
        textDecorationLine: 'line-through',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 12,
        marginTop: 16,
    },
    description: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 12,
    },
    stock: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 12,
    },
    variantSection: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    variantButton: {
        borderWidth: 2,
        borderColor: '#E0E0E0',
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 8,
    },
    variantButtonActive: {
        borderColor: '#FF6B35',
        backgroundColor: '#FFF3E0',
    },
    variantButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
    },
    variantButtonTextActive: {
        color: '#FF6B35',
    },
    quantitySection: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    quantityButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FF6B35',
    },
    quantityValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1A1A1A',
        minWidth: 40,
        textAlign: 'center',
    },
    specsSection: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    specRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    specLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#666',
    },
    specValue: {
        fontSize: 13,
        color: '#1A1A1A',
    },
    footer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        backgroundColor: '#FFF',
    },
    shareButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#FF6B35',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#FF6B35',
    },
    addToCartButton: {
        flex: 1,
        backgroundColor: '#FF6B35',
        paddingVertical: 12,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addToCartButtonDisabled: {
        backgroundColor: '#CCC',
    },
    addToCartButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '700',
    },
});