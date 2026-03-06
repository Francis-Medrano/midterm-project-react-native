import React, { useEffect, useState, useMemo, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, Pressable, Image } from 'react-native';
import { fetchJobs, Job } from '../api/jobsApi';
import { createHomeScreenStyles } from '../shared/styles/HomeScreenStyles';
import { createButtonStyles } from '../shared/styles/ButtonStyles';
import { SearchBar } from '../shared/components/SearchBar';
import { useSavedJobs } from '../shared/context/SavedJobsContext';
import { useTheme } from '../shared/context/ThemeContext';
import { lightTheme, darkTheme } from '../theme/colors';
import { usePreventGoBack } from '../handler/usePreventGoBack';
import { AppHeader } from '../shared/components/AppHeader';

interface HomeScreenProps {
  onJobSelect: (job: Job) => void;
  onApply: (job: Job) => void;
  onSavedJobsPress: () => void;
}

export default function HomeScreen({ onJobSelect, onApply, onSavedJobsPress }: HomeScreenProps) {
  usePreventGoBack();
  const { themeMode } = useTheme();
  const themeColors = themeMode === 'light' ? lightTheme : darkTheme;
  const styles = createHomeScreenStyles(themeColors);
  const buttonStyles = createButtonStyles(themeColors);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [offset, setOffset] = useState(0);
  const { savedJobIds, saveJob } = useSavedJobs();

  const JOBS_PER_PAGE = 10;

  // Initial load
  useEffect(() => {
    const loadInitialJobs = async () => {
      try {
        setLoading(true);
        const response = await fetchJobs(JOBS_PER_PAGE, 0);
        // Deduplicate jobs from initial load
        const uniqueJobs = Array.from(new Map(response.jobs.map(job => [job.id, job])).values());
        setJobs(uniqueJobs);
        setAllJobs(uniqueJobs);
        setOffset(JOBS_PER_PAGE);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load jobs');
        console.error('Error loading jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialJobs();
  }, []);

  // Load more jobs when scrolling
  const handleEndReached = async () => {
    if (loadingMore) return; // Don't load more if already loading

    try {
      setLoadingMore(true);
      const response = await fetchJobs(JOBS_PER_PAGE, offset);
      if (response.jobs.length > 0) {
        // Deduplicate jobs to avoid duplicate key warnings
        setJobs(prev => {
          const existingIds = new Set(prev.map(j => j.id));
          const newJobs = response.jobs.filter(job => !existingIds.has(job.id));
          return [...prev, ...newJobs];
        });
        setAllJobs(prev => {
          const existingIds = new Set(prev.map(j => j.id));
          const newJobs = response.jobs.filter(job => !existingIds.has(job.id));
          return [...prev, ...newJobs];
        });
        setOffset(prev => prev + JOBS_PER_PAGE);
      }
    } catch (err) {
      console.error('Error loading more jobs:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  const filteredJobs = useMemo(() => {
    if (!searchQuery.trim()) return jobs;
    
    const query = searchQuery.toLowerCase();
    return jobs.filter(job =>
      job.title.toLowerCase().includes(query) ||
      job.companyName.toLowerCase().includes(query) ||
      job.mainCategory.toLowerCase().includes(query) ||
      job.locations.some(loc => loc.toLowerCase().includes(query))
    );
  }, [jobs, searchQuery]);

  const handleApply = (job: Job) => {
    onApply(job);
  };

  const handleSaveJob = (job: Job, alreadySaved: boolean) => {
    if (alreadySaved) {
      return;
    }
    saveJob(job);
    Alert.alert('Job Saved', `"${job.title}" has been added to your saved jobs.`);
  };

  const renderJobCard = ({ item }: { item: Job }) => {
    const isSaved = savedJobIds.has(item.id);
    return (
      <View style={styles.jobCardWrapper}>
        <View style={[styles.jobCard, { backgroundColor: themeColors.card }]}>
          <Pressable 
            style={styles.jobCardContent}
            onPress={() => onJobSelect(item)}
          >
            <View style={styles.jobCardHeader}>
              {item.companyLogo && (
                <Image 
                  source={{ uri: item.companyLogo }}
                  style={styles.companyLogo}
                />
              )}
              <View style={styles.jobCardTextWrapper}>
                <Text style={[styles.jobTitle, { color: themeColors.text }]}>{item.title}</Text>
                <Text style={[styles.companyName, { color: themeColors.primary }]}>{item.companyName}</Text>
              </View>
            </View>
            <View style={styles.jobMeta}>
              <Text style={[styles.jobMetaText, { backgroundColor: themeColors.border, color: themeColors.placeholder }]}>{item.jobType}</Text>
              <Text style={[styles.jobMetaText, { backgroundColor: themeColors.border, color: themeColors.placeholder }]}>{item.workModel}</Text>
            </View>
            <View style={styles.jobLocationLevel}>
              <Text style={[styles.jobLocation, { color: themeColors.placeholder }]}>📍 {item.locations.join(', ')}</Text>
              <Text style={[styles.jobLevel, { color: themeColors.placeholder }]}>{item.seniorityLevel}</Text>
            </View>
            {item.minSalary && item.maxSalary && (
              <Text style={styles.jobSalary}>
                {item.currency} {item.minSalary.toLocaleString()} - {item.maxSalary.toLocaleString()}
              </Text>
            )}
            <Text style={[styles.jobCategory, { backgroundColor: themeColors.secondary, color: themeColors.text }]}>{item.mainCategory}</Text>
          </Pressable>
          <View style={buttonStyles.cardButtonContainer}>
            <Pressable 
              style={buttonStyles.cardApplyButton}
              onPress={() => handleApply(item)}
            >
              <Text style={buttonStyles.cardButtonText}>Apply</Text>
            </Pressable>
            <Pressable 
              style={[buttonStyles.cardSaveButton, { backgroundColor: isSaved ? '#4CAF50' : '#FF6B6B', opacity: isSaved ? 0.6 : 1 }]}
              onPress={() => handleSaveJob(item, isSaved)}
              disabled={isSaved}
            >
              <Text style={buttonStyles.cardButtonText}>{isSaved ? '✓ Saved' : '♡ Save'}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <AppHeader title="Job Listings" showBack={false} onSavedJobsPress={onSavedJobsPress} />
      <SearchBar 
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search by job, company, or location..."
      />
      <FlatList
        data={filteredJobs}
        renderItem={renderJobCard}
        keyExtractor={(item, index) => `${item.id}`}
        ListEmptyComponent={
          loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={themeColors.primary} />
              <Text style={[styles.loadingText, { color: themeColors.text }]}>Loading jobs...</Text>
            </View>
          ) : error ? (
            <View style={[styles.errorContainer, { backgroundColor: themeColors.error }]}>
              <Text style={styles.errorText}>Error: {error}</Text>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: themeColors.text }]}>No jobs found</Text>
              <Text style={[styles.emptySubtext, { color: themeColors.placeholder }]}>
                {searchQuery ? 'Try adjusting your search' : 'Check back later'}
              </Text>
            </View>
          )
        }
        ListFooterComponent={
          loadingMore ? (
            <View style={{ paddingVertical: 20, alignItems: 'center' }}>
              <ActivityIndicator size="small" color={themeColors.primary} />
            </View>
          ) : (
            <View style={[styles.footer, { borderTopColor: themeColors.border }]}>
              <Text style={[styles.footerText, { color: themeColors.placeholder }]}>© 2026 Job Finder App</Text>
            </View>
          )
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
      />
    </View>
  );
}
