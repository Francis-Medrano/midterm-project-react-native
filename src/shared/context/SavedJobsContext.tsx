import React, { createContext, useContext, useState, useCallback } from 'react';
import { Job } from '../../api/jobsApi';

interface SavedJobsContextType {
  savedJobIds: Set<string>;
  savedJobs: Map<string, Job>;
  saveJob: (job: Job) => void;
  unsaveJob: (jobId: string) => void;
  isSaved: (jobId: string) => boolean;
}

const SavedJobsContext = createContext<SavedJobsContextType | undefined>(undefined);

export const SavedJobsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());
  const [savedJobs, setSavedJobs] = useState<Map<string, Job>>(new Map());

  const saveJob = useCallback((job: Job) => {
    setSavedJobIds(prev => {
      if (prev.has(job.id)) return prev;
      return new Set(prev).add(job.id);
    });
    setSavedJobs(prev => {
      const newMap = new Map(prev);
      if (!newMap.has(job.id)) {
        newMap.set(job.id, job);
      }
      return newMap;
    });
  }, []);

  const unsaveJob = useCallback((jobId: string) => {
    setSavedJobIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(jobId);
      return newSet;
    });
    setSavedJobs(prev => {
      const newMap = new Map(prev);
      newMap.delete(jobId);
      return newMap;
    });
  }, []);

  const isSaved = useCallback((jobId: string) => {
    return savedJobIds.has(jobId);
  }, [savedJobIds]);

  return (
    <SavedJobsContext.Provider value={{ savedJobIds, savedJobs, saveJob, unsaveJob, isSaved }}>
      {children}
    </SavedJobsContext.Provider>
  );
};

export const useSavedJobs = () => {
  const context = useContext(SavedJobsContext);
  if (!context) {
    throw new Error('useSavedJobs must be used within SavedJobsProvider');
  }
  return context;
};
