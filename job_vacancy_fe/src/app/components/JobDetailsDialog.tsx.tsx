import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { JobVacancy } from '../types/jobTypes';

interface JobDetailsDialogProps {
    open: boolean;
    onClose: () => void;
    jobDetails: JobVacancy | null;
}

const JobDetailsDialog: React.FC<JobDetailsDialogProps> = ({ open, onClose, jobDetails }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            {jobDetails && (
                <DialogContent>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {jobDetails.title}
                    </Typography>

                    <Typography variant="h5" color="textSecondary" gutterBottom>
                        {jobDetails.company_name}
                    </Typography>

                    <Box display="flex" alignItems="center" mb={1}>
                        <LocationOnIcon color="action" />
                        <Typography variant="body1" ml={1}>
                            {jobDetails.location}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" mb={1}>
                        <WorkIcon color="action" />
                        <Typography variant="body1" ml={1}>
                        <strong>{jobDetails.role}</strong> ({jobDetails.teaser})
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" mb={1}>
                        <AccessTimeIcon color="action" />
                        <Typography variant="body1" ml={1}>
                            {jobDetails.work_type}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" mb={1}>
                        <MonetizationOnIcon color="action" />
                        <Typography variant="body1" ml={1}>
                            {jobDetails.salary}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" mb={1}>
                        <CalendarTodayIcon color="action" />
                        <Typography variant="body1" ml={1}>
                            Posted {jobDetails.listing_date}
                        </Typography>
                    </Box>
                    <br/>
                    <Box mb={2}>
                        <Typography variant="h6">
                            <strong>Bullet Points:</strong>
                        </Typography>
                        {jobDetails.bullet_points.split('\n').map((point, index) => (
                            <Typography key={index} variant="body2" component="li" style={{ marginLeft: '20px' }}>
                                {point}
                            </Typography>
                        ))}
                    </Box>

                </DialogContent>
            )}

            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default JobDetailsDialog;
