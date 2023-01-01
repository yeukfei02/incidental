import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CustomSnackBar from '../customSnackBar/CustomSnackBar';
import IncidentCardList from '../incidentCardList/IncidentCardList';
import { IncidentType, UserRole } from '@prisma/client';
import * as incidentService from '../../services/incidentService';

function AdminDashboard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [incidentType, setIncidentType] = useState<IncidentType>(
    IncidentType.MEDIUM
  );

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleIncidentTypeChange = (event: SelectChangeEvent) => {
    setIncidentType(event.target.value as IncidentType);
  };

  const handleCreateIncidentButtonClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleCreateIncident = async () => {
    const token = localStorage.getItem('token');
    const creatorId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');

    if (
      token &&
      title &&
      description &&
      incidentType &&
      creatorId &&
      userRole &&
      userRole === UserRole.ADMIN
    ) {
      const response = await incidentService.createIncident(
        token,
        title,
        description,
        incidentType,
        creatorId,
        userRole as UserRole
      );
      console.log('response = ', response);

      if (response) {
        const responseData = response.data;
        if (responseData) {
          setDialogOpen(false);
          setSnackbarOpen(true);
        }
      }
    }
  };

  return (
    <div className="px-10 py-8">
      <div className="flex justify-end">
        <Button variant="outlined" onClick={handleCreateIncidentButtonClick}>
          Create Incident
        </Button>
      </div>

      <IncidentCardList />

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create Incident</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              type="text"
              autoComplete="title"
              autoFocus
              value={title}
              onChange={(e) => handleTitleChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              type="text"
              id="description"
              autoComplete="description"
              value={description}
              onChange={(e) => handleDescriptionChange(e)}
            />
            <div className="my-5">
              <FormControl className="w-full">
                <InputLabel id="demo-simple-select-helper-label">
                  Incident Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={incidentType}
                  label="Incident Type"
                  onChange={handleIncidentTypeChange}
                >
                  <MenuItem value={IncidentType.HIGH}>High</MenuItem>
                  <MenuItem value={IncidentType.MEDIUM}>Medium</MenuItem>
                  <MenuItem value={IncidentType.LOW}>Low</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button onClick={() => handleCreateIncident()}>
            Create Incident
          </Button>
        </DialogActions>
      </Dialog>

      <CustomSnackBar
        type="Create incident"
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
      />
    </div>
  );
}

export default AdminDashboard;
