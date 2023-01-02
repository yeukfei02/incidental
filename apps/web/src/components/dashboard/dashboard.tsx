import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CustomSnackBar from '../customSnackBar/CustomSnackBar';
import IncidentCardList from '../incidentCardList/IncidentCardList';
import CustomAppBar from '../customAppBar/CustomAppBar';
import { IncidentType, UserRole } from '@prisma/client';
import * as incidentService from '../../services/incidentService';
import CustomBreadcrumbs from '../customBreadcrumbs/CustomBreadcrumbs';

function Dashboard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [incidentType, setIncidentType] = useState<IncidentType>(
    IncidentType.MEDIUM
  );

  const [incidents, setIncidents] = useState([]);
  const [searchText, setSearchText] = useState('');

  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    getIncidents(searchText);
  }, [searchText]);

  const getIncidents = async (searchText?: string) => {
    if (token && userRole && userId) {
      const response = await incidentService.getIncidents(
        token,
        userRole as UserRole,
        userId,
        searchText
      );
      console.log('response = ', response);

      if (response) {
        const responseData = response.data;
        if (responseData) {
          setSnackbarOpen(true);
          setSnackbarText('Get incidents');
          setIncidents(responseData.incidents);
        }
      }
    }
  };

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

  const handleDeleteButtonClick = () => {
    setDialogOpen(false);
  };

  const handleSearchTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchText(e.target.value);
  };

  const handleCreateIncident = async () => {
    if (
      token &&
      title &&
      description &&
      incidentType &&
      userId &&
      userRole &&
      userRole === UserRole.ADMIN
    ) {
      const response = await incidentService.createIncident(
        token,
        title,
        description,
        incidentType,
        userId,
        userRole as UserRole
      );
      console.log('response = ', response);

      if (response) {
        const responseData = response.data;
        if (responseData) {
          setDialogOpen(false);
          setSnackbarOpen(true);
          setSnackbarText('Create incident');

          setTitle('');
          setDescription('');
          setIncidentType(IncidentType.MEDIUM);

          await getIncidents(searchText);
        }
      }
    }
  };

  return (
    <>
      <CustomAppBar />

      <div className="px-10 py-6">
        <CustomBreadcrumbs page="Incidents" />
      </div>

      <div className="px-10">
        <div className="flex justify-between">
          <TextField
            className="w-2/6"
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={(e) => handleSearchTextChange(e)}
          />
          {userRole && userRole === UserRole.ADMIN ? (
            <Button
              variant="outlined"
              onClick={handleCreateIncidentButtonClick}
            >
              Create Incident
            </Button>
          ) : null}
        </div>

        <IncidentCardList incidents={incidents} getIncidents={getIncidents} />

        <Dialog
          fullWidth
          open={dialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="flex justify-end m-4">
            <CloseIcon
              className="cursor-pointer"
              onClick={() => handleDeleteButtonClick()}
            />
          </div>
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
          type={snackbarText}
          open={snackbarOpen}
          setOpen={setSnackbarOpen}
        />
      </div>
    </>
  );
}

export default Dashboard;
