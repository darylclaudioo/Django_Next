/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, CircularProgress, Paper, TablePagination, MenuItem, Select, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import JobTable from '@/app/components/JobTable';
import JobDialog from '@/app/components/JobDialog';
import JobDetailsDialog from '@/app/components/JobDetailsDialog.tsx';
import { fetchJobs, createJob, updateJob, deleteJob, fetchJobDetails, scrapeJobs, exportJobsToExcel } from '@/app/api/jobApi';
import { JobVacancy } from '@/app/types/jobTypes';
import { toast } from 'react-toastify'; 

const keywords = [
  { label: 'Java Spring', value: 'java-spring' },
  { label: 'Python Django', value: 'python-django' },
  { label: 'Python Flask', value: 'python-flask' },
  { label: 'NodeJS Express', value: 'nodejs-express' },
  { label: 'NodeJS Nest', value: 'nodejs-nest' },
  { label: '.NET Core', value: '.net-core' },
  { label: 'Angular', value: 'angular' },
  { label: 'ReactJS', value: 'reactjs' },
  { label: 'React Native', value: 'react-native' },
  { label: 'Flutter', value: 'flutter' }
];

const JobVacanciesPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobVacancy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [open, setOpen] = useState<boolean>(false); // Dialog state for Add/Edit
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false); // Dialog state for Details
  const [isEditMode, setIsEditMode] = useState<boolean>(false); // Track edit mode
  const [editJobId, setEditJobId] = useState<number | null>(null); // Job being edited
  const [newJob, setNewJob] = useState<JobVacancy>({
    id: 0,
    title: '',
    teaser: '',
    company_name: '',
    location: '',
    work_type: '',
    salary: '',
    role: '',
    keyword: '',
    listing_date: '',
    bullet_points: '',
  });
  const [jobDetails, setJobDetails] = useState<JobVacancy | null>(null);
  const [scrapingDialogOpen, setScrapingDialogOpen] = useState<boolean>(false); // Dialog for scraping
  const [selectedKeyword, setSelectedKeyword] = useState<string>(''); // Selected keyword for scraping
  const [filterKeyword, setFilterKeyword] = useState<string>(''); // Keyword filter state

  useEffect(() => {
    loadJobs();
  }, [filterKeyword]); // Reload jobs when the filter keyword changes

  const loadJobs = async () => {
    setLoading(true);
    if (filterKeyword) {
      // Fetch jobs based on the selected filter keyword
      const jobs = await fetchJobs(filterKeyword); // Assuming fetchJobs can accept keyword as parameter
      setJobs(jobs);
    } else {
      // Fetch all jobs if no filter is selected
      const jobs = await fetchJobs();
      setJobs(jobs);
    }
    setLoading(false);
  };

  const handleEdit = (job: JobVacancy) => {
    setIsEditMode(true);
    setEditJobId(job.id);
    setNewJob(job);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteJob(id);
    toast.success('Job deleted successfully');
    loadJobs();
  };

  const handleDetails = async (id: number) => {
    const details = await fetchJobDetails(id);
    setJobDetails(details);
    setDetailsOpen(true);
  };

  const handleSubmit = async () => {
    if (isEditMode && editJobId) {
      await updateJob(editJobId, newJob);
      toast.success('Job updated successfully');
    } else {
      await createJob(newJob);
      toast.success('Job created successfully');
    }
    loadJobs();
    setOpen(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDialogOpen = () => {
    setIsEditMode(false);
    setNewJob({
      id: 0,
      title: '',
      teaser: '',
      company_name: '',
      location: '',
      work_type: '',
      salary: '',
      role: '',
      keyword: '',
      listing_date: '',
      bullet_points: '',
    });
    setOpen(true);
  };

  const handleScrapingDialogOpen = () => {
    setScrapingDialogOpen(true);
  };

  const handleScrapingSubmit = async () => {
    if (selectedKeyword) {
      await scrapeJobs(selectedKeyword);
      toast.success(`Scraping data for keyword "${selectedKeyword}" was successful.`);
      loadJobs();
    } else {
      toast.error('Please select a keyword');
    }
    setScrapingDialogOpen(false);
  };

  const handleExport = async () => {
    await exportJobsToExcel();
    toast.success('Job data exported successfully');
  };

  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: 25, marginBottom: 20 }} gutterBottom>Job Application</Typography>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <div>
          <Button variant="contained" color="primary" onClick={handleDialogOpen} style={{ marginRight: 10 }}>
            Add New Job
          </Button>
          <Button variant="contained" color="warning" onClick={handleScrapingDialogOpen} style={{ marginRight: 10 }}>
            Scraping Data
          </Button>
          <Button variant="contained" color="success" onClick={handleExport}>
            Export Data
          </Button>
        </div>

        {/* Keyword filter dropdown */}
        <Select
          value={filterKeyword}
          onChange={(e) => setFilterKeyword(e.target.value)}
          displayEmpty
          style={{ width: 200 }}
        >
          <MenuItem value=""><em>Keyword..</em></MenuItem>
          {keywords.map((keyword) => (
            <MenuItem key={keyword.value} value={keyword.value}>{keyword.label}</MenuItem>
          ))}
        </Select>
      </div>

      {loading ? <CircularProgress /> : (
        <Paper>
          <JobTable
            jobs={jobs}
            page={page}
            rowsPerPage={rowsPerPage}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleDetails={handleDetails}
          />
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={jobs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{ marginBottom: 25 }}
          />
        </Paper>
      )}

      <JobDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        newJob={newJob}
        handleInputChange={(e) => setNewJob({ ...newJob, [e.target.name]: e.target.value })}
        isEditMode={isEditMode}
      />

      <JobDetailsDialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        jobDetails={jobDetails}
      />

      {/* Scraping Dialog */}
      <Dialog open={scrapingDialogOpen} onClose={() => setScrapingDialogOpen(false)}>
        <DialogTitle>Scrape Job Data</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            value={selectedKeyword}
            onChange={(e) => setSelectedKeyword(e.target.value)}
            displayEmpty
          >
            <MenuItem value=""><em>Select a keyword</em></MenuItem>
            {keywords.map((keyword) => (
              <MenuItem key={keyword.value} value={keyword.value}>{keyword.label}</MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setScrapingDialogOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleScrapingSubmit} color="primary">Scrape</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default JobVacanciesPage;
