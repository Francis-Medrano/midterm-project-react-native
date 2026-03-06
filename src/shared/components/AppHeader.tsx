import React from 'react';
import { View, Text, Pressable, Switch } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import { useTheme } from '../context/ThemeContext';
import { useSavedJobs } from '../context/SavedJobsContext';
import { lightTheme, darkTheme } from '../../theme/colors';
import { createAppHeaderStyles } from '../styles/AppHeaderStyles';

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
  const styles = createAppHeaderStyles();

  return (
    <View style={[styles.header, { backgroundColor: themeColors.card, shadowColor: themeColors.text }]}>
      <View style={styles.headerContent}>
        <View style={styles.leftSection}>
          {showBack && onBackPress && (
            <Pressable onPress={onBackPress} style={styles.backButton}>
              <Entypo name="back" size={24} color={themeColors.text} />
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
            <FontAwesome6 name="people-group" size={24} color={themeColors.text} />
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
