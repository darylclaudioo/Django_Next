import axios from 'axios';
import { JobVacancy } from '../types/jobTypes';

// Get all jobs
export const fetchJobs = async (keyword?: string): Promise<JobVacancy[]> => {
    try {
      // If a keyword is provided, include it in the API URL
      const response = await axios.get<JobVacancy[]>(
        keyword ? `http://localhost:8000/job/${keyword}/` : 'http://localhost:8000/job/'
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }
  };

// Get job details
export const fetchJobDetails = async (id: number): Promise<JobVacancy> => {
    const response = await axios.get(`http://localhost:8000/job/${id}/`);
    return response.data;
};

// Create new job
export const createJob = async (newJob: JobVacancy): Promise<JobVacancy> => {
    const response = await axios.post('http://localhost:8000/job/create/', newJob, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
};

// Update existing job
export const updateJob = async (id: number, updatedJob: JobVacancy): Promise<JobVacancy> => {
    const response = await axios.put(`http://localhost:8000/job/edit/${id}/`, updatedJob, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
};

// Delete job
export const deleteJob = async (id: number): Promise<void> => {
    await axios.delete(`http://localhost:8000/job/delete/${id}/`);
};

export const scrapeJobs = async (keyword: string) => {
    await axios.get(`http://localhost:8000/scrape-jobs/${keyword}/`);
};

export const exportJobsToExcel = async () => {
    window.open('http://localhost:8000/job/export/excel', '_blank');
  };