import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: '#666',
    },
    columnWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    footer: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    errorText: {
        color: '#FF5252',
        textAlign: 'center',
        marginHorizontal: 16,
        marginVertical: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        marginBottom: 16,
    },
    retryButton: {
        backgroundColor: '#FF6B35',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 6,
    },
    retryButtonText: {
        color: '#FFF',
        fontWeight: '600',
    },
    cartButton: {
        position: 'relative',
        marginRight: 16,
    },
    cartIcon: {
        fontSize: 24,
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#FF5252',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: '#FFF',
        fontSize: 11,
        fontWeight: 'bold',
    },
});