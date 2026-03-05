import { StyleSheet } from 'react-native';
import { Theme, lightTheme } from '../../theme/colors';

export const createFormStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      padding: 24,
      paddingTop: 32,
      backgroundColor: theme.primary,
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      paddingRight: 16,
    },
    backButtonText: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#fff',
      flex: 1,
    },
    content: {
      padding: 16,
      paddingBottom: 24,
    },
    jobInfoSection: {
      backgroundColor: theme.card,
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    jobTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 8,
    },
    companyName: {
      fontSize: 14,
      color: theme.primary,
      fontWeight: '600',
    },
    formSection: {
      backgroundColor: theme.card,
      padding: 16,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 8,
      marginTop: 12,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 14,
      color: theme.text,
      backgroundColor: theme.background,
    },
    textAreaInput: {
      minHeight: 120,
      paddingTop: 10,
    },
    submitButton: {
      backgroundColor: theme.primary,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 24,
    },
    submitButtonText: {
      color: '#fff',
      fontSize: 16,
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
      padding: 24,
      alignItems: 'center',
      width: '80%',
      maxWidth: 300,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
    successTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.success,
      marginBottom: 12,
      textAlign: 'center',
    },
    successMessage: {
      fontSize: 14,
      color: theme.text,
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 20,
    },
    modalButton: {
      backgroundColor: theme.primary,
      paddingHorizontal: 32,
      paddingVertical: 12,
      borderRadius: 8,
      minWidth: 120,
      alignItems: 'center',
    },
    modalButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });

// Fallback for backward compatibility
export const formStyles = createFormStyles(lightTheme);
