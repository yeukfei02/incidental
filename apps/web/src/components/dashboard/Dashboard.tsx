import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import Pagination from '@mui/material/Pagination';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
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
import { Typography } from '@mui/material';

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
  const [totalPageCount, setTotalPageCount] = useState(0);

  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [sortByCreatedAt, setSortByCreatedAt] = useState(false);
  const [sortByUpdatedAt, setSortByUpdatedAt] = useState(false);

  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    getIncidents(searchText, page, sortByCreatedAt, sortByUpdatedAt);
  }, [searchText, page, sortByCreatedAt, sortByUpdatedAt]);

  const getIncidents = async (
    searchText?: string,
    page?: number,
    sortByCreatedAt?: boolean,
    sortByUpdatedAt?: boolean
  ) => {
    if (token && userRole && userId) {
      const pageStr = page ? page.toString() : '1';
      const perPageStr = '10';

      const sortByCreatedAtStr = sortByCreatedAt ? 'true' : 'false';
      const sortByUpdatedAtStr = sortByUpdatedAt ? 'true' : 'false';

      const response = await incidentService.getIncidents(
        token,
        userRole as UserRole,
        userId,
        searchText,
        pageStr,
        perPageStr,
        sortByCreatedAtStr,
        sortByUpdatedAtStr
      );
      console.log('response = ', response);

      if (response) {
        const responseData = response.data;
        if (responseData) {
          setSnackbarOpen(true);
          setSnackbarText('Get incidents');
          setIncidents(responseData.incidents);
          setTotalPageCount(responseData.totalPageCount);
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

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const handleSortByCreatedAt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortByCreatedAt(e.target.checked);
  };

  const handleSortByUpdatedAt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortByUpdatedAt(e.target.checked);
  };

  return (
    <>
      <CustomAppBar />

      <div className="px-10 py-6">
        <CustomBreadcrumbs page="Incidents" />
      </div>

      <div className="px-10">
        <div className="flex items-center justify-between">
          <TextField
            className="w-2/6"
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={(e) => handleSearchTextChange(e)}
          />
          {userRole && userRole === UserRole.ADMIN ? (
            <Button
              className="self-stretch"
              variant="outlined"
              onClick={handleCreateIncidentButtonClick}
            >
              Create Incident
            </Button>
          ) : null}
        </div>

        <Card className="p-5 mt-5">
          <Typography variant="h5">
            <span className="font-bold">Search and Filter</span>
          </Typography>
          <Pagination
            className="my-5"
            count={totalPageCount}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
            showFirstButton
            showLastButton
          />

          <div className="flex flex-row items-center">
            <FormControlLabel
              control={<Switch onChange={(e) => handleSortByCreatedAt(e)} />}
              label={`Sort by Created At (${
                sortByCreatedAt ? 'Ascending' : 'Descending'
              })`}
            />
            <FormControlLabel
              control={<Switch onChange={(e) => handleSortByUpdatedAt(e)} />}
              label={`Sort by Updated At (${
                sortByUpdatedAt ? 'Ascending' : 'Descending'
              })`}
            />
          </div>
        </Card>

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
                multiline
                minRows={5}
                maxRows={10}
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
