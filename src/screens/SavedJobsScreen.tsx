import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Alert, Pressable } from 'react-native';
import { useSavedJobs } from '../shared/context/SavedJobsContext';
import { useTheme } from '../shared/context/ThemeContext';
import { createHomeScreenStyles } from '../shared/styles/HomeScreenStyles';
import { createButtonStyles } from '../shared/styles/ButtonStyles';
import { lightTheme, darkTheme } from '../theme/colors';
import ApplicationFormScreen from './ApplicationFormScreen';
import { usePreventGoBack } from '../handler/usePreventGoBack';

interface SavedJobsScreenProps {
  allJobs: any[];
  onBack: () => void;
  onJobSelect: (job: any) => void;
  onApply: (job: any) => void;
}

export default function SavedJobsScreen({ allJobs, onBack, onJobSelect, onApply }: SavedJobsScreenProps) {
  usePreventGoBack();
  const { savedJobIds, unsaveJob } = useSavedJobs();
  const { themeMode } = useTheme();
  const themeColors = themeMode === 'light' ? lightTheme : darkTheme;
  const styles = createHomeScreenStyles(themeColors);
  const buttonStyles = createButtonStyles(themeColors);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationJob, setApplicationJob] = useState<any>(null);

  const savedJobs = useMemo(() => {
    return allJobs.filter(job => savedJobIds.has(job.id));
  }, [allJobs, savedJobIds]);

  const handleApplyClick = (job: any) => {
    setApplicationJob(job);
    setShowApplicationForm(true);
  };

  const handleUnsaveJob = (jobId: string, jobTitle: string) => {
    unsaveJob(jobId);
    Alert.alert('Job Unsaved', `"${jobTitle}" has been removed from your saved jobs.`);
  };

  const renderJobCard = ({ item }: { item: any }) => (
    <View style={styles.jobCardWrapper}>
      <View style={[styles.jobCard, { backgroundColor: themeColors.card }]}>
        <Pressable 
          style={styles.jobCardContent}
          onPress={() => onJobSelect(item)}
        >
          <Text style={[styles.jobTitle, { color: themeColors.text }]}>{item.title}</Text>
          <Text style={[styles.companyName, { color: themeColors.primary }]}>{item.companyName}</Text>
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
            style={[buttonStyles.cardApplyButton, { backgroundColor: themeColors.primary }]}
            onPress={() => handleApplyClick(item)}
          >
            <Text style={buttonStyles.cardButtonText}>Apply</Text>
          </Pressable>
          <Pressable
            style={[buttonStyles.cardSaveButton, { backgroundColor: themeColors.error }]}
            onPress={() => handleUnsaveJob(item.id, item.title)}
          >
            <Text style={buttonStyles.cardButtonText}>✕ Unsave</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <>
      {showApplicationForm && applicationJob ? (
        <ApplicationFormScreen 
          job={applicationJob} 
          onBack={() => setShowApplicationForm(false)}
          onSubmitSuccess={onBack}
          isFromSavedJobs={true}
        />
      ) : (
        <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
          <View style={[styles.header, { backgroundColor: themeColors.primary }]}>
            <TouchableOpacity onPress={onBack} style={styles.savedJobsBackButton}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={[styles.title, { color: themeColors.text }]}>Saved Jobs</Text>
          </View>

          {savedJobs.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: themeColors.text }]}>No saved jobs yet</Text>
              <Text style={[styles.emptySubtext, { color: themeColors.placeholder }]}>Save jobs to view them here</Text>
            </View>
          ) : (
            <>
              <Text style={[styles.savedJobsCount, { color: themeColors.text }]}>{savedJobs.length} saved job{savedJobs.length !== 1 ? 's' : ''}</Text>
              <FlatList
                data={savedJobs}
                renderItem={renderJobCard}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                contentContainerStyle={styles.listContent}
              />
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
