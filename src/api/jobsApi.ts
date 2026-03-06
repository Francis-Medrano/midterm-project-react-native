import 'react-native-get-random-values';
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';

const API_URL = 'https://empllo.com/api/v1';
const NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'; // Standard namespace UUID

export interface Job {
  id: string;
  title: string;
  mainCategory: string;
  companyName: string;
  companyLogo: string;
  jobType: string;
  workModel: string;
  seniorityLevel: string;
  locations: string[];
  minSalary: number | null;
  maxSalary: number | null;
  currency: string;
  description: string;
  applicationLink: string;
}

export interface JobsResponse {
  jobs: Job[];
  total_count: number;
  offset: number;
  limit: number;
}

export const fetchJobs = async (limit: number = 10, offset: number = 0): Promise<JobsResponse> => {
  try {
    const response = await fetch(`${API_URL}?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data: JobsResponse = await response.json();
    const jobsWithIds = data.jobs.map(job => {
      // Generate a consistent UUID based on job title and company name
      // This ensures the same job always gets the same ID
      const jobIdentifier = `${job.title}-${job.companyName}-${job.locations.join(',')}`;
      const consistentId = uuidv5(jobIdentifier, NAMESPACE);
      return {
        ...job,
        id: job.id || consistentId, // Use existing ID if available, otherwise use generated one
      };
    });
    return {
      ...data,
      jobs: jobsWithIds,
    };
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const fetchJobsByCategory = async (category: string, limit: number = 10): Promise<JobsResponse> => {
  try {
    const allJobs = await fetchJobs(100);
    const filteredJobs = allJobs.jobs.filter(
      job => job.mainCategory.toLowerCase().includes(category.toLowerCase())
    );
    return {
      ...allJobs,
      jobs: filteredJobs.slice(0, limit),
      total_count: filteredJobs.length,
    };
  } catch (error) {
    console.error('Error fetching jobs by category:', error);
    throw error;
  }
};
