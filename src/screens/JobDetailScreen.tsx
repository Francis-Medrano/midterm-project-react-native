import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Job } from '../api/jobsApi';
import { styles } from '../shared/styles/JobDetailScreenStyles';
import { useSavedJobs } from '../shared/context/SavedJobsContext';

interface JobDetailScreenProps {
  job: Job;
  onBack: () => void;
}

export default function JobDetailScreen({ job, onBack }: JobDetailScreenProps) {
  const { saveJob, unsaveJob, isSaved } = useSavedJobs();
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{job.title}</Text>
      </View>

      <View style={styles.content}>
        {/* Company Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company</Text>
          <Text style={styles.companyName}>{job.companyName}</Text>
        </View>

        {/* Job Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Position Level:</Text>
            <Text style={styles.value}>{job.seniorityLevel}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Job Type:</Text>
            <Text style={styles.value}>{job.jobType}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Work Model:</Text>
            <Text style={styles.value}>{job.workModel}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Category:</Text>
            <Text style={styles.value}>{job.mainCategory}</Text>
          </View>
        </View>

        {/* Location Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <Text style={styles.value}>{job.locations.join(', ')}</Text>
        </View>

        {/* Salary Section */}
        {job.minSalary && job.maxSalary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Salary</Text>
            <View style={styles.salaryBox}>
              <Text style={styles.salaryText}>
                {job.currency} {job.minSalary.toLocaleString()} - {job.maxSalary.toLocaleString()}
              </Text>
            </View>
          </View>
        )}

        {/* Description Section */}
        {job.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{job.description.replace(/<[^>]*>/g, '')}</Text>
          </View>
        )}

        {/* Application Link */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.applyButton}
            onPress={() => {
              // In a real app, you would use Linking to open the URL
              console.log('Opening:', job.applicationLink);
            }}
          >
            <Text style={styles.applyButtonText}>Apply Now</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.applyButton, { marginTop: 10, backgroundColor: isJobSaved ? '#4CAF50' : '#2196F3' }]}
            onPress={handleSaveJob}
          >
            <Text style={styles.applyButtonText}>{isJobSaved ? 'Saved' : 'Save Job'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Job ID: {job.id}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
