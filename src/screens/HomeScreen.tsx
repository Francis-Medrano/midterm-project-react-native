import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, ScrollView, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native';
import { fetchJobs, Job } from '../api/jobsApi';
import { homeScreenStyles as styles } from '../shared/styles/HomeScreenStyles';
import { buttonStyles } from '../shared/styles/ButtonStyles';
import JobDetailScreen from './JobDetailScreen';
import SavedJobsScreen from './SavedJobsScreen';
import { SearchBar } from '../shared/components/SearchBar';
import { useSavedJobs } from '../shared/context/SavedJobsContext';

export default function HomeScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSavedJobs, setShowSavedJobs] = useState(false);
  const { savedJobIds, saveJob, unsaveJob } = useSavedJobs();

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const response = await fetchJobs(10);
        setJobs(response.jobs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load jobs');
        console.error('Error loading jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

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
    Alert.alert(
      'Apply to Job',
      `Redirecting to ${job.companyName} application...`,
      [{ text: 'OK' }]
    );
    console.log('Opening:', job.applicationLink);
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
        <View style={styles.jobCard}>
          <TouchableOpacity 
            style={styles.jobCardContent}
            onPress={() => setSelectedJob(item)}
            activeOpacity={0.7}
          >
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.companyName}>{item.companyName}</Text>
            <View style={styles.jobMeta}>
              <Text style={styles.jobMetaText}>{item.jobType}</Text>
              <Text style={styles.jobMetaText}>{item.workModel}</Text>
            </View>
            <View style={styles.jobLocationLevel}>
              <Text style={styles.jobLocation}>📍 {item.locations.join(', ')}</Text>
              <Text style={styles.jobLevel}>{item.seniorityLevel}</Text>
            </View>
            {item.minSalary && item.maxSalary && (
              <Text style={styles.jobSalary}>
                {item.currency} {item.minSalary.toLocaleString()} - {item.maxSalary.toLocaleString()}
              </Text>
            )}
            <Text style={styles.jobCategory}>{item.mainCategory}</Text>
          </TouchableOpacity>
          <View style={buttonStyles.cardButtonContainer}>
            <TouchableOpacity 
              style={buttonStyles.cardApplyButton}
              onPress={() => handleApply(item)}
            >
              <Text style={buttonStyles.cardButtonText}>Apply</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[buttonStyles.cardSaveButton, { backgroundColor: isSaved ? '#4CAF50' : '#FF6B6B' }]}
              onPress={() => handleSaveJob(item, isSaved)}
            >
              <Text style={buttonStyles.cardButtonText}>{isSaved ? '✓ Saved' : '♡ Save'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      {selectedJob ? (
        <JobDetailScreen 
          job={selectedJob} 
          onBack={() => setSelectedJob(null)} 
        />
      ) : showSavedJobs ? (
        <SavedJobsScreen 
          allJobs={jobs}
          onBack={() => setShowSavedJobs(false)}
          onJobSelect={setSelectedJob}
        />
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View>
                <Text style={styles.title}>Job Listings</Text>
                <Text style={styles.subtitle}>From Empllo API</Text>
              </View>
              <TouchableOpacity 
                style={styles.savedJobsButton}
                onPress={() => setShowSavedJobs(true)}
              >
                <Text style={styles.savedJobsButtonText}>❤️</Text>
                {savedJobIds.size > 0 && (
                  <View style={styles.savedJobsBadge}>
                    <Text style={styles.badgeText}>{savedJobIds.size}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>

          <SearchBar 
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by job, company, or location..."
          />

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Loading jobs...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Error: {error}</Text>
            </View>
          ) : filteredJobs.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No jobs found</Text>
              <Text style={styles.emptySubtext}>
                {searchQuery ? 'Try adjusting your search' : 'Check back later'}
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredJobs}
              renderItem={renderJobCard}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.listContent}
            />
          )}

          <View style={styles.footer}>
            <Text style={styles.footerText}>© 2026 Job Finder App</Text>
          </View>
        </ScrollView>
      )}
    </>
  );
}
