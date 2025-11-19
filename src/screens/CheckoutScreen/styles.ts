import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },

    // Section
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 12,
    },

    // Order Summary
    summaryBox: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    totalRow: {
        borderBottomWidth: 0,
        marginTop: 4,
    },
    summaryLabel: {
        fontSize: 13,
        color: '#666',
    },
    summaryValue: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1A1A1A',
    },
    totalLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    totalValue: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FF6B35',
    },

    // Form Inputs
    input: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        color: '#1A1A1A',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    halfInput: {
        flex: 1,
        marginRight: 8,
        marginBottom: 0,
    },

    // Security Note
    securityNote: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 6,
        marginTop: 8,
    },
    securityIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    securityText: {
        flex: 1,
        fontSize: 12,
        color: '#2E7D32',
    },

    // Terms
    termsBox: {
        backgroundColor: '#FFF3E0',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 6,
        marginBottom: 20,
    },
    termsText: {
        fontSize: 12,
        color: '#E65100',
        lineHeight: 16,
    },

    // Footer
    footer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    placeOrderButton: {
        flexDirection: 'row',
        backgroundColor: '#FF6B35',
        paddingVertical: 14,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#CCC',
    },
    placeOrderIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    placeOrderButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFF',
    },

    // Success Screen
    successContainer: {
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    successIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    successIconText: {
        fontSize: 40,
        color: '#FFF',
        fontWeight: '700',
    },
    successTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 8,
        textAlign: 'center',
    },
    orderIdText: {
        fontSize: 14,
        color: '#FF6B35',
        fontWeight: '700',
        marginBottom: 24,
    },
    successDetails: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    detailLabel: {
        fontSize: 12,
        color: '#999',
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 13,
        color: '#1A1A1A',
        fontWeight: '600',
        marginBottom: 12,
    },
    amountBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        marginTop: 12,
    },
    amountLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    amountValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FF6B35',
    },
    continueButton: {
        width: '100%',
        backgroundColor: '#FF6B35',
        paddingVertical: 12,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    continueButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFF',
    },
});