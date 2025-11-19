import { StyleSheet } from "react-native";

export const style = (width: number) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 40,
    },

    // Header Section
    headerSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FF6B35',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#FF6B35',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    logoText: {
        fontSize: 48,
    },
    appName: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 8,
    },
    tagline: {
        fontSize: 14,
        color: '#666666',
        fontWeight: '500',
    },

    // Welcome Section
    welcomeSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    welcomeTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 8,
    },
    welcomeSubtitle: {
        fontSize: 14,
        color: '#888888',
        textAlign: 'center',
        lineHeight: 20,
    },

    // Features Section
    featuresSection: {
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 16,
        marginBottom: 32,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    featureIcon: {
        fontSize: 20,
        color: '#4CAF50',
        marginRight: 12,
        fontWeight: 'bold',
    },
    featureContent: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 2,
    },
    featureDesc: {
        fontSize: 12,
        color: '#888888',
    },

    // Sign In Section
    signinSection: {
        marginBottom: 24,
    },
    signinTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 16,
        textAlign: 'center',
    },

    googleButtonLarge: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#FF6B35',
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    googleIcon: {
        // fontSize: 20,
        marginRight: 10,
        width: width * 0.055,
        height: width * 0.055,
    },
    googleButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FF6B35',
    },

    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    dividerText: {
        marginHorizontal: 12,
        color: '#888888',
        fontSize: 12,
        fontWeight: '500',
    },

    emailButton: {
        flexDirection: 'row',
        backgroundColor: '#FF6B35',
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#FF6B35',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    emailIcon: {
        fontSize: 18,
        marginRight: 10,
    },
    emailButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },

    // Footer Section
    footerSection: {
        marginTop: 20,
    },
    footerText: {
        fontSize: 11,
        color: '#999999',
        textAlign: 'center',
        lineHeight: 16,
    },
    footerLink: {
        color: '#FF6B35',
        fontWeight: '600',
    },
});