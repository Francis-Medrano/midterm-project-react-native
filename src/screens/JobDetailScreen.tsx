import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Job } from '../api/jobsApi';

interface JobDetailScreenProps {
  job: Job;
  onBack: () => void;
}

export default function JobDetailScreen({ job, onBack }: JobDetailScreenProps) {
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
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Job ID: {job.id}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  backButton: {
    marginBottom: 12,
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  content: {
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  companyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  salaryBox: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#28a745',
  },
  salaryText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#28a745',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  applyButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});
