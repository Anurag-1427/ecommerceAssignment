import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },

    // Header
    header: {
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
    },
    avatarPlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FF6B35',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarPlaceholderText: {
        fontSize: 28,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 12,
        color: '#999',
    },

    // Sections
    section: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 12,
    },

    // Menu Grid
    menuGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    menuItem: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    menuIcon: {
        fontSize: 28,
        marginBottom: 4,
    },
    menuItemTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 2,
    },
    menuItemSubtitle: {
        fontSize: 10,
        color: '#999',
    },

    // Features
    featuresList: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    featureIcon: {
        fontSize: 24,
        marginRight: 12,
    },
    featureContent: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 2,
    },
    featureDescription: {
        fontSize: 11,
        color: '#999',
    },

    // Promo Banner
    promoBanner: {
        marginHorizontal: 16,
        marginVertical: 16,
        backgroundColor: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 20,
        alignItems: 'center',
    },
    promoIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    promoTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF',
        marginBottom: 4,
    },
    promoText: {
        fontSize: 13,
        color: '#FFF',
        marginBottom: 12,
    },
    promoButton: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 6,
    },
    promoButtonText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#FF6B35',
    },

    // Info Box
    infoBox: {
        marginHorizontal: 16,
        marginBottom: 16,
        backgroundColor: '#FFF',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    infoTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#FF6B35',
        marginBottom: 4,
    },
    infoText: {
        fontSize: 11,
        color: '#999',
        textAlign: 'center',
    },

    // Footer
    footer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    logoutButton: {
        flexDirection: 'row',
        backgroundColor: '#FFE8DC',
        paddingVertical: 12,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    logoutButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FF6B35',
    },
});
