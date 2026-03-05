import { StyleSheet } from 'react-native';
import { Theme, lightTheme } from '../../theme/colors';

export const createButtonStyles = (theme: Theme) =>
  StyleSheet.create({
    cardButtonContainer: {
      flexDirection: 'row',
      gap: 8,
      padding: 12,
      paddingTop: 8,
      backgroundColor: theme.card,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    cardApplyButton: {
      flex: 1,
      backgroundColor: theme.primary,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardSaveButton: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardButtonText: {
      color: '#fff',
      fontSize: 13,
      fontWeight: '600',
    },
  });

// Fallback for backward compatibility
export const buttonStyles = createButtonStyles(lightTheme);
