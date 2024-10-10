import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { JobVacancy } from '../types/jobTypes';

interface JobDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  newJob: JobVacancy;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditMode: boolean;
}

const JobDialog: React.FC<JobDialogProps> = ({
  open, onClose, onSubmit, newJob, handleInputChange, isEditMode
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEditMode ? 'Edit Job' : 'Add New Job'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          name="title"
          value={newJob.title}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Teaser"
          name="teaser"
          value={newJob.teaser}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Company Name"
          name="company_name"
          value={newJob.company_name}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Location"
          name="location"
          value={newJob.location}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Work Type"
          name="work_type"
          value={newJob.work_type}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Salary"
          name="salary"
          value={newJob.salary}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Role"
          name="role"
          value={newJob.role}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Keyword"
          name="keyword"
          value={newJob.keyword}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Listing Date"
          name="listing_date"
          type="date"
          value={newJob.listing_date}
          onChange={handleInputChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          label="Bullet Points"
          name="bullet_points"
          value={newJob.bullet_points}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          {isEditMode ? 'Update' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobDialog;
