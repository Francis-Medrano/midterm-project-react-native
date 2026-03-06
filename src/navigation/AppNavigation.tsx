import React, { useState, useEffect } from 'react';
import { fetchJobs, Job } from '../api/jobsApi';
import HomeScreen from '../screens/HomeScreen';
import JobDetailScreen from '../screens/JobDetailScreen';
import SavedJobsScreen from '../screens/SavedJobsScreen';
import ApplicationFormScreen from '../screens/ApplicationFormScreen';

export interface NavigationState {
  showApplicationForm: boolean;
  applicationJob: Job | null;
  selectedJob: Job | null;
  showSavedJobs: boolean;
  isFormFromSavedJobs: boolean;
}

export const AppNavigation = () => {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    showApplicationForm: false,
    applicationJob: null,
    selectedJob: null,
    showSavedJobs: false,
    isFormFromSavedJobs: false,
  });
  const [allJobs, setAllJobs] = useState<Job[]>([]);

  useEffect(() => {
    const loadAllJobs = async () => {
      try {
        const response = await fetchJobs(100);
        setAllJobs(response.jobs);
      } catch (err) {
        console.error('Error loading jobs:', err);
      }
    };

    loadAllJobs();
  }, []);

  const navigateToJobDetail = (job: Job) => {
    setNavigationState((prev) => ({
      ...prev,
      selectedJob: job,
    }));
  };

  const navigateToApplicationForm = (job: Job) => {
    setNavigationState((prev) => ({
      ...prev,
      applicationJob: job,
      showApplicationForm: true,
      isFormFromSavedJobs: prev.showSavedJobs,
    }));
  };

  const navigateToSavedJobs = () => {
    setNavigationState({
      showApplicationForm: false,
      applicationJob: null,
      selectedJob: null,
      showSavedJobs: true,
    });
  };

  const goBack = () => {
    setNavigationState({
      showApplicationForm: false,
      applicationJob: null,
      selectedJob: null,
      isFormFromSavedJobs: false,
      showSavedJobs: false,
    });
  };

  const goBackFromJobDetail = () => {
    setNavigationState((prev) => {
      if (prev.showSavedJobs) {
        // Return to SavedJobs screen
        return {
          ...prev,
          selectedJob: null,
        };
      } else {
        // Return to HomeScreen
        return {
          showApplicationForm: false,
          applicationJob: null,
          selectedJob: null,
          isFormFromSavedJobs: false,
          showSavedJobs: false,
        };
      }
    });
  };

  return (
    <>
      {navigationState.showApplicationForm && navigationState.applicationJob ? (
        <ApplicationFormScreen
          job={navigationState.applicationJob}
          onBack={goBack}
          onSubmitSuccess={goBack}
          isFromSavedJobs={navigationState.isFormFromSavedJobs}
          onSavedJobsPress={navigateToSavedJobs}
        />
      ) : navigationState.selectedJob ? (
        <JobDetailScreen
          job={navigationState.selectedJob}
          onBack={goBackFromJobDetail}
          onSavedJobsPress={navigateToSavedJobs}
          onApplyPress={() => navigateToApplicationForm(navigationState.selectedJob!)}
        />
      ) : navigationState.showSavedJobs ? (
        <SavedJobsScreen
          allJobs={allJobs}
          onBack={goBack}
          onJobSelect={navigateToJobDetail}
          onApply={navigateToApplicationForm}
          onSavedJobsPress={navigateToSavedJobs}
        />
      ) : (
        <HomeScreen
          onJobSelect={navigateToJobDetail}
          onApply={navigateToApplicationForm}
          onSavedJobsPress={navigateToSavedJobs}
        />
      )}
    </>
  );
};

export default AppNavigation;
