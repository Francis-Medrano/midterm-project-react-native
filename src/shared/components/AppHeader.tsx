import React from 'react';
import { View, Text, Pressable, Switch } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useSavedJobs } from '../context/SavedJobsContext';
import { lightTheme, darkTheme } from '../../theme/colors';

interface AppHeaderProps {
  title: string;
  onBackPress?: () => void;
  onSavedJobsPress?: () => void;
  showBack?: boolean;
}

export const AppHeader = ({ title, onBackPress, onSavedJobsPress, showBack = true }: AppHeaderProps) => {
  const { toggleTheme, themeMode } = useTheme();
  const themeColors = themeMode === 'light' ? lightTheme : darkTheme;
  const { savedJobIds } = useSavedJobs();

  return (
    <View style={[styles.header, { backgroundColor: themeColors.card, shadowColor: themeColors.text }]}>
      <View style={styles.headerContent}>
        <View style={styles.leftSection}>
          {showBack && onBackPress && (
            <Pressable onPress={onBackPress} style={styles.backButton}>
              <Text style={[styles.backButtonText, { color: themeColors.text }]}>← Back</Text>
            </Pressable>
          )}
        </View>
        <Text style={[styles.title, { color: themeColors.text }]} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.rightSection}>
          <View style={styles.themeSliderContainer}>
            <Switch
              style={styles.themeSwitch}
              value={themeMode === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: '#ccc', true: '#67C3CC' }}
              thumbColor={themeMode === 'dark' ? '#fff' : '#f4f3f4'}
            />
          </View>
          <Pressable
            onPress={onSavedJobsPress}
            disabled={!onSavedJobsPress}
            style={styles.savedJobsContainer}
          >
            <Text style={styles.iconText}>❤️</Text>
            {savedJobIds.size > 0 && (
              <View style={[styles.badge, { backgroundColor: '#FF6B6B' }]}>
                <Text style={[styles.badgeText, { color: themeColors.text }]}>{savedJobIds.size}</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = {
  header: {
    height: 100,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
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
    width: 80,
  },
  backButton: {
    padding: 10,
    paddingTop: 20,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    paddingTop: 20,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: 120,
    justifyContent: 'flex-end',
  },
  themeSliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 20,
  },
  themeSwitch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  iconButton: {
    padding: 10,
    paddingTop: 20,
  },
  iconText: {
    fontSize: 24,
  },
  savedJobsContainer: {
    position: 'relative',
    paddingTop: 20,
    paddingRight: 10,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
};
