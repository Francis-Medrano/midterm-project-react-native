const API_URL = 'https://empllo.com/api/v1';

export interface Job {
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
    return data;
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
