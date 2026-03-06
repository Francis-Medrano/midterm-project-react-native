import { StyleSheet, Dimensions } from 'react-native';
import { Theme, lightTheme } from '../../theme/colors';

const screenWidth = Dimensions.get('window').width;
const responsiveFontSize = (baseSize: number) => (screenWidth / 375) * baseSize;
const responsivePadding = (basePadding: number) => (screenWidth / 375) * basePadding;

export const createButtonStyles = (theme: Theme) =>
  StyleSheet.create({
    cardButtonContainer: {
      flexDirection: 'row',
      gap: responsivePadding(8),
      padding: responsivePadding(12),
      paddingTop: responsivePadding(8),
      backgroundColor: theme.card,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    cardApplyButton: {
      flex: 1,
      backgroundColor: theme.primary,
      paddingVertical: responsivePadding(10),
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardSaveButton: {
      flex: 1,
      paddingVertical: responsivePadding(10),
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardButtonText: {
      color: '#fff',
      fontSize: responsiveFontSize(13),
      fontWeight: '600',
    },
  });

// Fallback for backward compatibility
export const buttonStyles = createButtonStyles(lightTheme);
