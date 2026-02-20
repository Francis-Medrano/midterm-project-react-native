import React, { useMemo } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useSavedJobs } from '../shared/context/SavedJobsContext';
import { homeScreenStyles as styles } from '../shared/styles/HomeScreenStyles';
import { buttonStyles } from '../shared/styles/ButtonStyles';

interface SavedJobsScreenProps {
  allJobs: any[];
  onBack: () => void;
  onJobSelect: (job: any) => void;
}

export default function SavedJobsScreen({ allJobs, onBack, onJobSelect }: SavedJobsScreenProps) {
  const { savedJobIds, unsaveJob } = useSavedJobs();

  const savedJobs = useMemo(() => {
    return allJobs.filter(job => savedJobIds.has(job.id));
  }, [allJobs, savedJobIds]);

  const handleApply = (job: any) => {
    Alert.alert(
      'Apply to Job',
      `Redirecting to ${job.companyName} application...`,
      [{ text: 'OK' }]
    );
    console.log('Opening:', job.applicationLink);
  };

  const handleUnsaveJob = (jobId: string, jobTitle: string) => {
    unsaveJob(jobId);
    Alert.alert('Job Unsaved', `"${jobTitle}" has been removed from your saved jobs.`);
  };

  const renderJobCard = ({ item }: { item: any }) => (
    <View style={styles.jobCardWrapper}>
      <View style={styles.jobCard}>
        <TouchableOpacity 
          style={styles.jobCardContent}
          onPress={() => onJobSelect(item)}
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
            style={[buttonStyles.cardSaveButton, { backgroundColor: '#FF6B6B' }]}
            onPress={() => handleUnsaveJob(item.id, item.title)}
          >
            <Text style={buttonStyles.cardButtonText}>✕ Unsave</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.savedJobsBackButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Saved Jobs</Text>
      </View>

      {savedJobs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No saved jobs yet</Text>
          <Text style={styles.emptySubtext}>Save jobs to view them here</Text>
        </View>
      ) : (
        <>
          <Text style={styles.savedJobsCount}>{savedJobs.length} saved job{savedJobs.length !== 1 ? 's' : ''}</Text>
          <FlatList
            data={savedJobs}
            renderItem={renderJobCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
          />
        </>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Job Finder App</Text>
      </View>
    </ScrollView>
  );
}
