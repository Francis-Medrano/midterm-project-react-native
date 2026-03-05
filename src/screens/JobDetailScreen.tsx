import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, Pressable } from 'react-native';
import { Job } from '../api/jobsApi';
import { createJobDetailStyles } from '../shared/styles/JobDetailScreenStyles';
import { useSavedJobs } from '../shared/context/SavedJobsContext';
import { useTheme } from '../shared/context/ThemeContext';
import { lightTheme, darkTheme } from '../theme/colors';
import { usePreventGoBack } from '../handler/usePreventGoBack';

interface JobDetailScreenProps {
  job: Job;
  onBack: () => void;
}

export default function JobDetailScreen({ job, onBack }: JobDetailScreenProps) {
  usePreventGoBack();
  const { saveJob, unsaveJob, isSaved } = useSavedJobs();
  const { themeMode } = useTheme();
  const themeColors = themeMode === 'light' ? lightTheme : darkTheme;
  const styles = createJobDetailStyles(themeColors);
  const [isJobSaved, setIsJobSaved] = useState(isSaved(job.id));

  const handleSaveJob = () => {
    if (isJobSaved) {
      unsaveJob(job.id);
      setIsJobSaved(false);
      Alert.alert('Job Unsaved', `"${job.title}" has been removed from your saved jobs.`);
    } else {
      saveJob(job.id);
      setIsJobSaved(true);
      Alert.alert('Job Saved', `"${job.title}" has been added to your saved jobs.`);
    }
  };
  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { backgroundColor: themeColors.primary }]}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
        <Text style={[styles.title, { color: themeColors.text }]}>{job.title}</Text>
      </View>

      <View style={[styles.content, { backgroundColor: themeColors.background }]}>
        {/* Company Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Company</Text>
          <Text style={[styles.companyName, { color: themeColors.primary }]}>{job.companyName}</Text>
        </View>

        {/* Job Info Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Job Information</Text>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: themeColors.text }]}>Position Level:</Text>
            <Text style={[styles.value, { color: themeColors.cardText }]}>{job.seniorityLevel}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: themeColors.text }]}>Job Type:</Text>
            <Text style={[styles.value, { color: themeColors.cardText }]}>{job.jobType}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: themeColors.text }]}>Work Model:</Text>
            <Text style={[styles.value, { color: themeColors.cardText }]}>{job.workModel}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: themeColors.text }]}>Category:</Text>
            <Text style={[styles.value, { color: themeColors.cardText }]}>{job.mainCategory}</Text>
          </View>
        </View>

        {/* Location Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Location</Text>
          <Text style={[styles.value, { color: themeColors.cardText }]}>{job.locations.join(', ')}</Text>
        </View>

        {/* Salary Section */}
        {job.minSalary && job.maxSalary && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Salary</Text>
            <View style={[styles.salaryBox, { backgroundColor: themeColors.card }]}>
              <Text style={[styles.salaryText, { color: themeColors.success }]}>
                {job.currency} {job.minSalary.toLocaleString()} - {job.maxSalary.toLocaleString()}
              </Text>
            </View>
          </View>
        )}

        {/* Description Section */}
        {job.description && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Description</Text>
            <Text style={[styles.description, { color: themeColors.cardText }]}>{job.description.replace(/<[^>]*>/g, '')}</Text>
          </View>
        )}

        {/* Application Link */}
        <View style={styles.section}>
          <Pressable
            style={[styles.applyButton, { backgroundColor: themeColors.primary }]}
            onPress={() => {
              // In a real app, you would use Linking to open the URL
              console.log('Opening:', job.applicationLink);
            }}
          >
            <Text style={styles.applyButtonText}>Apply Now</Text>
          </Pressable>

          <Pressable
            style={[styles.applyButton, { marginTop: 10, backgroundColor: isJobSaved ? themeColors.success : themeColors.secondary }]}
            onPress={handleSaveJob}
          >
            <Text style={styles.applyButtonText}>{isJobSaved ? 'Saved' : 'Save Job'}</Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: themeColors.placeholder }]}>Job ID: {job.id}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
