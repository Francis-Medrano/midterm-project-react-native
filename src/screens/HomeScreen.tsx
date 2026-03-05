import React, { useEffect, useState, useMemo, useRef } from 'react';
import { View, Text, ScrollView, ActivityIndicator, FlatList, Alert, Pressable, Image } from 'react-native';
import { fetchJobs, Job } from '../api/jobsApi';
import { createHomeScreenStyles } from '../shared/styles/HomeScreenStyles';
import { createButtonStyles } from '../shared/styles/ButtonStyles';
import JobDetailScreen from './JobDetailScreen';
import SavedJobsScreen from './SavedJobsScreen';
import ApplicationFormScreen from './ApplicationFormScreen';
import { SearchBar } from '../shared/components/SearchBar';
import { useSavedJobs } from '../shared/context/SavedJobsContext';
import { useTheme } from '../shared/context/ThemeContext';
import { lightTheme, darkTheme } from '../theme/colors';
import { usePreventGoBack } from '../handler/usePreventGoBack';

export default function HomeScreen() {
  usePreventGoBack();
  const { toggleTheme, themeMode } = useTheme();
  const themeColors = themeMode === 'light' ? lightTheme : darkTheme;
  const styles = createHomeScreenStyles(themeColors);
  const buttonStyles = createButtonStyles(themeColors);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSavedJobs, setShowSavedJobs] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationJob, setApplicationJob] = useState<Job | null>(null);
  const { savedJobIds, saveJob, unsaveJob } = useSavedJobs();
  const scrollViewRef = useRef<ScrollView>(null);

  const JOBS_PER_PAGE = 10;

  useEffect(() => {
    const loadAllJobs = async () => {
      try {
        setLoading(true);
        const response = await fetchJobs(100);
        setAllJobs(response.jobs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load jobs');
        console.error('Error loading jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAllJobs();
  }, []);

  useEffect(() => {
    if (allJobs.length > 0) {
      const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
      setJobs(allJobs.slice(startIndex, startIndex + JOBS_PER_PAGE));
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  }, [currentPage, allJobs]);

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

  const totalPages = Math.ceil(allJobs.length / JOBS_PER_PAGE);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleApply = (job: Job) => {
    setApplicationJob(job);
    setShowApplicationForm(true);
  };

  const handleSaveJob = (job: Job, alreadySaved: boolean) => {
    if (alreadySaved) {
      unsaveJob(job.id);
      Alert.alert('Job Unsaved', `"${job.title}" has been removed from your saved jobs.`);
    } else {
      saveJob(job.id);
      Alert.alert('Job Saved', `"${job.title}" has been added to your saved jobs.`);
    }
  };

  const renderJobCard = ({ item }: { item: Job }) => {
    const isSaved = savedJobIds.has(item.id);
    return (
      <View style={styles.jobCardWrapper}>
        <View style={[styles.jobCard, { backgroundColor: themeColors.card }]}>
          <Pressable 
            style={styles.jobCardContent}
            onPress={() => setSelectedJob(item)}
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
              style={[buttonStyles.cardSaveButton, { backgroundColor: isSaved ? '#4CAF50' : '#FF6B6B' }]}
              onPress={() => handleSaveJob(item, isSaved)}
            >
              <Text style={buttonStyles.cardButtonText}>{isSaved ? '✓ Saved' : '♡ Save'}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      {showApplicationForm && applicationJob ? (
        <ApplicationFormScreen 
          job={applicationJob} 
          onBack={() => setShowApplicationForm(false)}
          onSubmitSuccess={() => setShowApplicationForm(false)}
          isFromSavedJobs={false}
        />
      ) : selectedJob ? (
        <JobDetailScreen 
          job={selectedJob} 
          onBack={() => setSelectedJob(null)} 
        />
      ) : showSavedJobs ? (
        <SavedJobsScreen 
          allJobs={jobs}
          onBack={() => setShowSavedJobs(false)}
          onJobSelect={setSelectedJob}
          onApply={handleApply}
        />
      ) : (
        <ScrollView ref={scrollViewRef} style={[styles.container, { backgroundColor: themeColors.background }]}>
          <View style={[styles.header, { backgroundColor: themeColors.primary }]}>
            <View style={styles.headerContent}>
              <View>
                <Text style={styles.title}>Job Listings</Text>
                <Text style={styles.subtitle}>From Empllo API</Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <Pressable
                  style={styles.savedJobsButton}
                  onPress={toggleTheme}
                >
                  <Text style={styles.savedJobsButtonText}>{themeMode === 'light' ? '🌙' : '☀️'}</Text>
                </Pressable>
                <Pressable
                  style={styles.savedJobsButton}
                  onPress={() => setShowSavedJobs(true)}
                >
                  <Text style={styles.savedJobsButtonText}>❤️</Text>
                  {savedJobIds.size > 0 && (
                    <View style={styles.savedJobsBadge}>
                      <Text style={styles.badgeText}>{savedJobIds.size}</Text>
                    </View>
                  )}
                </Pressable>
              </View>
            </View>
          </View>

          <SearchBar 
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by job, company, or location..."
          />

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={themeColors.primary} />
              <Text style={[styles.loadingText, { color: themeColors.text }]}>Loading jobs...</Text>
            </View>
          ) : error ? (
            <View style={[styles.errorContainer, { backgroundColor: themeColors.error }]}>
              <Text style={styles.errorText}>Error: {error}</Text>
            </View>
          ) : filteredJobs.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: themeColors.text }]}>No jobs found</Text>
              <Text style={[styles.emptySubtext, { color: themeColors.placeholder }]}>
                {searchQuery ? 'Try adjusting your search' : 'Check back later'}
              </Text>
            </View>
          ) : (
            <>
              <FlatList
                data={filteredJobs}
                renderItem={renderJobCard}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                contentContainerStyle={styles.listContent}
              />
              {totalPages > 0 && (
                <View style={styles.paginationContainer}>
                  <Pressable 
                    style={[styles.paginationArrow, { opacity: currentPage === 1 ? 0.5 : 1, backgroundColor: themeColors.primary }]}
                    onPress={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    <Text style={styles.paginationArrowText}>{'<'}</Text>
                  </Pressable>
                  <Text style={[styles.pageNumber, { color: themeColors.text }]}>{currentPage}</Text>
                  <Pressable 
                    style={[styles.paginationArrow, { opacity: currentPage === totalPages ? 0.5 : 1, backgroundColor: themeColors.primary }]}
                    onPress={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    <Text style={styles.paginationArrowText}>{'>'}</Text>
                  </Pressable>
                </View>
              )}
            </>
          )}

          <View style={[styles.footer, { borderTopColor: themeColors.border }]}>
            <Text style={[styles.footerText, { color: themeColors.placeholder }]}>© 2026 Job Finder App</Text>
          </View>
        </ScrollView>
      )}
    </>
  );
}
