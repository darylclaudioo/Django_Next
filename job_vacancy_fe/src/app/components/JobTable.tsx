import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { JobVacancy } from '../types/jobTypes';

interface JobTableProps {
  jobs: JobVacancy[];
  page: number;
  rowsPerPage: number;
  handleEdit: (job: JobVacancy) => void;
  handleDelete: (id: number) => void;
  handleDetails: (id: number) => void;
}

const JobTable: React.FC<JobTableProps> = ({
  jobs, page, rowsPerPage, handleEdit, handleDelete, handleDetails
}) => {
  const jobsOnPage = jobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>No</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Teaser</TableCell>
          <TableCell>Company</TableCell>
          <TableCell>Location</TableCell>
          <TableCell style={{ minWidth: 200 }}>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {jobsOnPage.map((job, index) => (
          <TableRow key={job.id}>
            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
            <TableCell>{job.title}</TableCell>
            <TableCell>{job.teaser}</TableCell>
            <TableCell>{job.company_name}</TableCell>
            <TableCell>{job.location}</TableCell>
            <TableCell>
              <IconButton color="default" onClick={() => handleDetails(job.id)}>
                <InfoIcon />
              </IconButton>
              <IconButton color="info" onClick={() => handleEdit(job)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(job.id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default JobTable;
