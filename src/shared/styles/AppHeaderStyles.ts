import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const responsiveFontSize = (baseSize: number) => (screenWidth / 375) * baseSize;
const responsivePadding = (basePadding: number) => (screenWidth / 375) * basePadding;

export const createAppHeaderStyles = () => {
  return {
    header: {
      height: responsivePadding(100),
      paddingTop: responsivePadding(16),
      paddingBottom: responsivePadding(16),
      paddingHorizontal: responsivePadding(16),
      elevation: 4,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      justifyContent: 'center',
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leftSection: {
      width: responsivePadding(80),
    },
    backButton: {
      padding: responsivePadding(10),
      paddingTop: responsivePadding(20),
    },
    backButtonText: {
      fontSize: responsiveFontSize(18),
      fontWeight: '600',
    },
    title: {
      fontSize: responsiveFontSize(22),
      fontWeight: 'bold',
      flex: 1,
      textAlign: 'center',
      paddingTop: responsivePadding(20),
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsivePadding(12),
      width: responsivePadding(120),
      justifyContent: 'flex-end',
    },
    themeSliderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsivePadding(6),
      paddingTop: responsivePadding(20),
    },
    themeSwitch: {
      transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    },
    iconButton: {
      padding: responsivePadding(10),
      paddingTop: responsivePadding(20),
    },
    iconText: {
      fontSize: responsiveFontSize(24),
    },
    savedJobsContainer: {
      position: 'relative',
      paddingTop: responsivePadding(20),
      paddingRight: responsivePadding(10),
    },
    badge: {
      position: 'absolute',
      top: -6,
      right: -6,
      width: responsivePadding(24),
      height: responsivePadding(24),
      borderRadius: responsivePadding(12),
      justifyContent: 'center',
      alignItems: 'center',
    },
    badgeText: {
      color: '#fff',
      fontSize: responsiveFontSize(13),
      fontWeight: 'bold',
    },
  };
};
