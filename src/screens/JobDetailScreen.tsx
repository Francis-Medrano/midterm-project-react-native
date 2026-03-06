import React from 'react';
import { View, Text, ScrollView, Alert, Pressable } from 'react-native';
import { Job } from '../api/jobsApi';
import { createJobDetailStyles } from '../shared/styles/JobDetailScreenStyles';
import { useSavedJobs } from '../shared/context/SavedJobsContext';
import { useTheme } from '../shared/context/ThemeContext';
import { lightTheme, darkTheme } from '../theme/colors';
import { usePreventGoBack } from '../handler/usePreventGoBack';
import { AppHeader } from '../shared/components/AppHeader';

interface JobDetailScreenProps {
  job: Job;
  onBack: () => void;
  onSavedJobsPress?: () => void;
  onApplyPress?: () => void;
}

// Helper function to format time ago
const formatTimeAgo = (timestamp: number) => {
  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  const diffInSeconds = now - timestamp;

  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }
};

// Helper function to parse and render HTML description
const parseHtmlDescription = (html: string, themeColors: any) => {
  if (!html) return null;

  // Split by <h3> tags to get sections
  const sections: React.ReactNode[] = [];
  const h3Regex = /<h3[^>]*>(.*?)<\/h3>(.*?)(?=<h3|$)/gs;
  let match;

  while ((match = h3Regex.exec(html)) !== null) {
    const title = match[1].replace(/<[^>]*>/g, '');
    const content = match[2];

    sections.push(
      <View key={title} style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: themeColors.text, marginBottom: 12 }}>
          {title}
        </Text>
        {/* Parse list items */}
        {content.split(/<li>/g).slice(1).map((item: string, index: number) => {
          const text = item.replace(/<\/li>/g, '').replace(/<[^>]*>/g, '').trim();
          if (!text) return null;
          return (
            <View key={index} style={{ flexDirection: 'row', marginBottom: 8 }}>
              <Text style={{ color: themeColors.cardText, marginRight: 8 }}>•</Text>
              <Text 
                style={{ 
                  color: themeColors.cardText, 
                  flex: 1, 
                  lineHeight: 20,
                  fontSize: 14 
                }}
              >
                {text}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }

  return sections.length > 0 ? sections : null;
};

export default function JobDetailScreen({ job, onBack, onSavedJobsPress, onApplyPress }: JobDetailScreenProps) {
  usePreventGoBack();
  const { saveJob, unsaveJob, isSaved } = useSavedJobs();
  const { themeMode } = useTheme();
  const themeColors = themeMode === 'light' ? lightTheme : darkTheme;
  const styles = createJobDetailStyles(themeColors);
  const isJobSaved = isSaved(job.id);

  const handleSaveJob = () => {
    if (isJobSaved) {
      unsaveJob(job.id);
      Alert.alert('Job Unsaved', `"${job.title}" has been removed from your saved jobs.`);
    } else {
      saveJob(job);
      Alert.alert('Job Saved', `"${job.title}" has been added to your saved jobs.`);
    }
  };
  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <AppHeader title={job.title} onBackPress={onBack} showBack={true} onSavedJobsPress={onSavedJobsPress} />

      <View style={[styles.content, { backgroundColor: themeColors.background }]}>
        {/* Info Chips Section */}
        <View style={styles.infoChipsContainer}>
          <View style={[styles.infoChip, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
            <Text style={styles.chipIcon}>⏰</Text>
            <View>
              <Text style={[styles.chipLabel, { color: themeColors.placeholder }]}>Added</Text>
              <Text style={[styles.chipValue, { color: themeColors.text }]}>{formatTimeAgo(job.pubDate)}</Text>
            </View>
          </View>

          <View style={[styles.infoChip, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
            <Text style={styles.chipIcon}>📍</Text>
            <View>
              <Text style={[styles.chipLabel, { color: themeColors.placeholder }]}>Location</Text>
              <Text style={[styles.chipValue, { color: themeColors.text }]}>{job.locations[0] || 'Not specified'}</Text>
            </View>
          </View>

          <View style={[styles.infoChip, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
            <Text style={styles.chipIcon}>🏢</Text>
            <View>
              <Text style={[styles.chipLabel, { color: themeColors.placeholder }]}>Type</Text>
              <Text style={[styles.chipValue, { color: themeColors.text }]}>{job.jobType}</Text>
            </View>
          </View>

          <View style={[styles.infoChip, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
            <Text style={styles.chipIcon}>💼</Text>
            <View>
              <Text style={[styles.chipLabel, { color: themeColors.placeholder }]}>Salary</Text>
              <Text 
                style={[styles.chipValue, { color: themeColors.text, fontSize: 9 }]}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {job.minSalary && job.maxSalary ? `${job.currency} ${job.minSalary.toLocaleString()} - ${job.maxSalary.toLocaleString()}` : 'Not provided'}
              </Text>
            </View>
          </View>
        </View>

        {/* Related Skills Section */}
        <View style={styles.skillsSection}>
          <Text style={[styles.skillsTitle, { color: themeColors.text }]}>Related skills</Text>
          <View style={styles.skillsContainer}>
            {['security', 'cloud', 'aws', 'monitoring', 'itil'].map((skill, index) => (
              <View key={index} style={[styles.skillTag, { backgroundColor: themeColors.background, borderColor: themeColors.primary }]}>
                <Text style={[styles.skillTagText, { color: themeColors.primary }]}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

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

        {/* Description Section */}
        {job.description && (
          <View style={styles.section}>
            {parseHtmlDescription(job.description, themeColors)}
          </View>
        )}

        {/* Application Link */}
        <View style={styles.section}>
          <Pressable
            style={[styles.applyButton, { backgroundColor: themeColors.primary }]}
            onPress={onApplyPress}
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
