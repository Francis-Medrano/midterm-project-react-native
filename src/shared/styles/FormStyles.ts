import { StyleSheet, Dimensions } from 'react-native';
import { Theme, lightTheme } from '../../theme/colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const responsiveFontSize = (baseSize: number) => (screenWidth / 375) * baseSize;
const responsivePadding = (basePadding: number) => (screenWidth / 375) * basePadding;

export const createFormStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      padding: responsivePadding(24),
      paddingTop: responsivePadding(32),
      backgroundColor: theme.primary,
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      paddingRight: responsivePadding(16),
    },
    backButtonText: {
      fontSize: responsiveFontSize(16),
      color: '#fff',
      fontWeight: '600',
    },
    title: {
      fontSize: responsiveFontSize(28),
      fontWeight: 'bold',
      color: '#fff',
      flex: 1,
    },
    content: {
      padding: responsivePadding(16),
      paddingBottom: responsivePadding(24),
    },
    jobInfoSection: {
      backgroundColor: theme.card,
      padding: responsivePadding(16),
      borderRadius: 12,
      marginBottom: responsivePadding(16),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    jobTitle: {
      fontSize: responsiveFontSize(18),
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: responsivePadding(8),
    },
    companyName: {
      fontSize: responsiveFontSize(14),
      color: theme.primary,
      fontWeight: '600',
    },
    formSection: {
      backgroundColor: theme.card,
      padding: responsivePadding(16),
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    label: {
      fontSize: responsiveFontSize(14),
      fontWeight: '600',
      color: theme.text,
      marginBottom: responsivePadding(8),
      marginTop: responsivePadding(12),
    },
    input: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      paddingHorizontal: responsivePadding(12),
      paddingVertical: responsivePadding(10),
      fontSize: responsiveFontSize(14),
      color: theme.text,
      backgroundColor: theme.background,
    },
    textAreaInput: {
      minHeight: screenHeight * 0.2,
      paddingTop: responsivePadding(10),
    },
    submitButton: {
      backgroundColor: theme.primary,
      paddingVertical: responsivePadding(14),
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: responsivePadding(24),
    },
    submitButtonText: {
      color: '#fff',
      fontSize: responsiveFontSize(16),
      fontWeight: '600',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: theme.card,
      borderRadius: 16,
      padding: responsivePadding(24),
      alignItems: 'center',
      width: screenWidth * 0.8,
      maxWidth: 300,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
    successTitle: {
      fontSize: responsiveFontSize(20),
      fontWeight: 'bold',
      color: theme.success,
      marginBottom: responsivePadding(12),
      textAlign: 'center',
    },
    successMessage: {
      fontSize: responsiveFontSize(14),
      color: theme.text,
      textAlign: 'center',
      marginBottom: responsivePadding(24),
      lineHeight: 20,
    },
    modalButton: {
      backgroundColor: theme.primary,
      paddingHorizontal: responsivePadding(32),
      paddingVertical: responsivePadding(12),
      borderRadius: 8,
      minWidth: responsivePadding(120),
      alignItems: 'center',
    },
    modalButtonText: {
      color: '#fff',
      fontSize: responsiveFontSize(16),
      fontWeight: '600',
    },
  });

// Fallback for backward compatibility
export const formStyles = createFormStyles(lightTheme);
