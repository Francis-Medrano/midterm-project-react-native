import { StyleSheet, Dimensions } from 'react-native';
import { Theme, lightTheme } from '../../theme/colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const responsiveFontSize = (baseSize: number) => (screenWidth / 375) * baseSize;
const responsivePadding = (basePadding: number) => (screenWidth / 375) * basePadding;

export const createHomeScreenStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
  header: {
    padding: responsivePadding(24),
    paddingTop: responsivePadding(32),
    backgroundColor: '#007AFF',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  title: {
    fontSize: responsiveFontSize(28),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: responsivePadding(8),
  },
  subtitle: {
    fontSize: responsiveFontSize(16),
    color: '#fff',
    opacity: 0.8,
  },
  listContent: {
    padding: responsivePadding(16),
  },
  jobCardWrapper: {
    marginBottom: responsivePadding(12),
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jobCardContent: {
    padding: responsivePadding(16),
  },
  jobCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: responsivePadding(12),
    gap: responsivePadding(12),
  },
  companyLogo: {
    width: responsivePadding(48),
    height: responsivePadding(48),
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  jobCardTextWrapper: {
    flex: 1,
  },
  jobTitle: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: responsivePadding(4),
  },
  companyName: {
    fontSize: responsiveFontSize(14),
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: responsivePadding(8),
  },
  jobMeta: {
    flexDirection: 'row',
    marginBottom: responsivePadding(8),
    gap: responsivePadding(8),
  },
  jobMetaText: {
    fontSize: responsiveFontSize(12),
    backgroundColor: '#f0f0f0',
    paddingHorizontal: responsivePadding(8),
    paddingVertical: responsivePadding(4),
    borderRadius: 4,
    color: '#666',
  },
  jobLocationLevel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsivePadding(8),
  },
  jobLocation: {
    fontSize: responsiveFontSize(12),
    color: '#666',
    flex: 1,
  },
  jobLevel: {
    fontSize: responsiveFontSize(12),
    color: '#999',
    fontStyle: 'italic',
  },
  jobSalary: {
    fontSize: responsiveFontSize(12),
    color: '#28a745',
    fontWeight: '600',
    marginBottom: responsivePadding(8),
  },
  jobCategory: {
    fontSize: responsiveFontSize(12),
    backgroundColor: '#e3f2fd',
    paddingHorizontal: responsivePadding(8),
    paddingVertical: responsivePadding(4),
    borderRadius: 4,
    color: '#007AFF',
    alignSelf: 'flex-start',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsivePadding(24),
  },
  loadingText: {
    marginTop: responsivePadding(12),
    fontSize: responsiveFontSize(14),
    color: '#666',
  },
  errorContainer: {
    padding: responsivePadding(24),
    margin: responsivePadding(16),
    backgroundColor: '#ffebee',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#d32f2f',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: responsiveFontSize(14),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsivePadding(24),
    minHeight: screenHeight * 0.4,
  },
  emptyText: {
    fontSize: responsiveFontSize(18),
    fontWeight: '600',
    color: '#333',
    marginBottom: responsivePadding(8),
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: responsiveFontSize(14),
    color: '#999',
    textAlign: 'center',
  },
  footer: {
    padding: responsivePadding(16),
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: responsivePadding(24),
  },
  footerText: {
    fontSize: responsiveFontSize(12),
    color: '#999',
  },
  savedJobsButton: {
    position: 'relative',
    padding: responsivePadding(8),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  savedJobsButtonText: {
    fontSize: responsiveFontSize(24),
  },
  savedJobsBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    minWidth: responsivePadding(20),
    height: responsivePadding(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: responsiveFontSize(12),
    fontWeight: 'bold',
  },
  savedJobsBackButton: {
    paddingRight: responsivePadding(16),
  },
  backButtonText: {
    fontSize: responsiveFontSize(16),
    color: '#fff',
    fontWeight: '600',
  },
  savedJobsCount: {
    fontSize: responsiveFontSize(14),
    color: '#666',
    paddingHorizontal: responsivePadding(16),
    paddingTop: responsivePadding(12),
    fontWeight: '500',
  },
  savedJobCardContainer: {
    position: 'relative',
    marginBottom: responsivePadding(12),
  },
  unsaveButton: {
    position: 'absolute',
    top: responsivePadding(12),
    right: responsivePadding(12),
    backgroundColor: '#ff4444',
    paddingHorizontal: responsivePadding(10),
    paddingVertical: responsivePadding(6),
    borderRadius: 6,
  },
  unsaveButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(12),
    fontWeight: '600',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: responsivePadding(4),
    paddingHorizontal: responsivePadding(16),
    paddingVertical: responsivePadding(16),
  },
  paginationArrow: {
    width: responsivePadding(40),
    height: responsivePadding(40),
    borderRadius: 8,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationArrowText: {
    color: '#fff',
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
  },
  pageNumber: {
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
      color: theme.text,
      minWidth: responsivePadding(50),
      textAlign: 'center',
    },
  pageNumberButton: {
    width: responsivePadding(40),
    height: responsivePadding(40),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.border,
  },
  pageNumberText: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
  },
  });

// Fallback for backward compatibility
export const homeScreenStyles = createHomeScreenStyles(lightTheme);
