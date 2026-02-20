import React, { createContext, useContext, useState, useCallback } from 'react';

interface SavedJobsContextType {
  savedJobIds: Set<string>;
  saveJob: (jobId: string) => void;
  unsaveJob: (jobId: string) => void;
  isSaved: (jobId: string) => boolean;
}

const SavedJobsContext = createContext<SavedJobsContextType | undefined>(undefined);

export const SavedJobsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());

  const saveJob = useCallback((jobId: string) => {
    setSavedJobIds(prev => new Set(prev).add(jobId));
  }, []);

  const unsaveJob = useCallback((jobId: string) => {
    setSavedJobIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(jobId);
      return newSet;
    });
  }, []);

  const isSaved = useCallback((jobId: string) => {
    return savedJobIds.has(jobId);
  }, [savedJobIds]);

  return (
    <SavedJobsContext.Provider value={{ savedJobIds, saveJob, unsaveJob, isSaved }}>
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
