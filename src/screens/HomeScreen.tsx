import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { fetchJobs, Job } from '../api/jobsApi';
import { homeScreenStyles as styles } from '../shared/styles/HomeScreenStyles';

export default function HomeScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const renderJobCard = ({ item }: { item: Job }) => (
    <View style={styles.jobCard}>
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
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Job Listings</Text>
        <Text style={styles.subtitle}>From Empllo API</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading jobs...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      ) : (
        <FlatList
          data={jobs}
          renderItem={renderJobCard}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
        />
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Job Finder App</Text>
      </View>
    </ScrollView>
  );
}
