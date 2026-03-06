import { StyleSheet, Dimensions } from 'react-native';
import { Theme, lightTheme } from '../../theme/colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const responsiveFontSize = (baseSize: number) => (screenWidth / 375) * baseSize;
const responsivePadding = (basePadding: number) => (screenWidth / 375) * basePadding;

export const createJobDetailStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      backgroundColor: theme.primary,
      paddingTop: responsivePadding(16),
      paddingBottom: responsivePadding(24),
      paddingHorizontal: responsivePadding(16),
    },
    backButton: {
      marginBottom: responsivePadding(12),
      paddingVertical: responsivePadding(8),
    },
    backButtonText: {
      color: '#fff',
      fontSize: responsiveFontSize(16),
      fontWeight: '600',
    },
    title: {
      fontSize: responsiveFontSize(24),
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: responsivePadding(8),
    },
    content: {
      padding: responsivePadding(16),
    },
    section: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: responsivePadding(16),
      marginBottom: responsivePadding(16),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    sectionTitle: {
      fontSize: responsiveFontSize(16),
      fontWeight: '700',
      color: theme.text,
      marginBottom: responsivePadding(12),
    },
    companyName: {
      fontSize: responsiveFontSize(18),
      fontWeight: '600',
      color: theme.primary,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: responsivePadding(8),
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    label: {
      fontSize: responsiveFontSize(14),
      color: theme.text,
      fontWeight: '600',
      flex: 1,
    },
    value: {
      fontSize: responsiveFontSize(14),
      color: theme.cardText,
      fontWeight: '500',
      flex: 1,
      textAlign: 'right',
    },
    salaryBox: {
      backgroundColor: theme.card,
      paddingHorizontal: responsivePadding(12),
      paddingVertical: responsivePadding(10),
      borderRadius: 8,
      borderLeftWidth: 4,
      borderLeftColor: theme.success,
    },
    salaryText: {
      fontSize: responsiveFontSize(16),
      fontWeight: '700',
      color: theme.success,
    },
    description: {
      fontSize: responsiveFontSize(14),
      color: theme.cardText,
      lineHeight: 20,
    },
    applyButton: {
      backgroundColor: theme.primary,
      paddingVertical: responsivePadding(14),
      borderRadius: 8,
      alignItems: 'center',
    },
    applyButtonText: {
      color: '#fff',
      fontSize: responsiveFontSize(16),
      fontWeight: '700',
    },
    footer: {
      paddingVertical: responsivePadding(16),
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: theme.border,
      marginTop: responsivePadding(16),
    },
    footerText: {
      fontSize: responsiveFontSize(12),
      color: theme.placeholder,
    },
    tagsContainer: {
      flexDirection: 'row',
      gap: responsivePadding(8),
      marginBottom: responsivePadding(16),
      flexWrap: 'wrap',
    },
    tag: {
      paddingHorizontal: responsivePadding(12),
      paddingVertical: responsivePadding(6),
      borderRadius: 20,
      backgroundColor: theme.secondary,
    },
    tagText: {
      fontSize: responsiveFontSize(13),
      fontWeight: '600',
      color: theme.primary,
    },
    infoChipsContainer: {
      flexDirection: 'row',
      gap: responsivePadding(8),
      marginBottom: responsivePadding(16),
      flexWrap: 'wrap',
    },
    infoChip: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: responsivePadding(12),
      borderRadius: 8,
      backgroundColor: theme.card,
      borderWidth: 1,
      borderColor: theme.border,
      flex: 1,
      minWidth: screenWidth * 0.4,
    },
    chipIcon: {
      fontSize: responsiveFontSize(20),
      marginRight: responsivePadding(8),
    },
    chipLabel: {
      fontSize: responsiveFontSize(12),
      color: theme.placeholder,
      marginBottom: 2,
    },
    chipValue: {
      fontSize: responsiveFontSize(14),
      fontWeight: '600',
      color: theme.text,
    },
    skillsSection: {
      marginBottom: responsivePadding(16),
    },
    skillsTitle: {
      fontSize: responsiveFontSize(16),
      fontWeight: '700',
      color: theme.text,
      marginBottom: responsivePadding(12),
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: responsivePadding(8),
    },
    skillTag: {
      paddingHorizontal: responsivePadding(12),
      paddingVertical: responsivePadding(6),
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.primary,
      backgroundColor: theme.background,
    },
    skillTagText: {
      fontSize: responsiveFontSize(13),
      fontWeight: '500',
      color: theme.primary,
    },
  });

// Fallback for backward compatibility
export const styles = createJobDetailStyles(lightTheme);
