import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
import SearchAndFilter from '../searchAndFilter/SearchAndFilter';

function Dashboard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createIncidentIncidentType, setCreateIncidentIncidentType] =
    useState<IncidentType>();
  const [incidentType, setIncidentType] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);

  const [incidents, setIncidents] = useState([]);
  const [totalPageCount, setTotalPageCount] = useState(0);

  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [sortByCreatedAt, setSortByCreatedAt] = useState(false);
  const [sortByUpdatedAt, setSortByUpdatedAt] = useState(false);

  const [expanded, setExpanded] = useState(true);

  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    getIncidents(
      searchText,
      incidentType,
      status,
      page,
      sortByCreatedAt,
      sortByUpdatedAt
    );
  }, [
    searchText,
    incidentType,
    status,
    page,
    sortByCreatedAt,
    sortByUpdatedAt,
  ]);

  const getIncidents = async (
    searchText?: string,
    incidentType?: string[],
    status?: string[],
    page?: number,
    sortByCreatedAt?: boolean,
    sortByUpdatedAt?: boolean
  ) => {
    if (token && userRole && userId) {
      const pageInt = page ? page : 1;
      const perPage = 10;

      const response = await incidentService.getIncidents(
        token,
        userRole as UserRole,
        userId,
        searchText,
        incidentType,
        status,
        pageInt,
        perPage,
        sortByCreatedAt,
        sortByUpdatedAt
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

  const handleCreateIncidentIncidentTypeChange = (event: SelectChangeEvent) => {
    setCreateIncidentIncidentType(event.target.value as IncidentType);
  };

  const handleIncidentTypeChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setIncidentType(typeof value === 'string' ? value.split(',') : value);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setStatus(typeof value === 'string' ? value.split(',') : value);
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

  const handleClearFilterClick = () => {
    setSearchText('');
    setIncidentType([]);
    setStatus([]);
    setPage(1);
    setSortByCreatedAt(false);
    setSortByUpdatedAt(false);
  };

  const handleCreateIncident = async () => {
    if (
      token &&
      title &&
      description &&
      createIncidentIncidentType &&
      userId &&
      userRole &&
      userRole === UserRole.ADMIN
    ) {
      const response = await incidentService.createIncident(
        token,
        title,
        description,
        createIncidentIncidentType,
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
          setIncidentType([]);

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

  const handleAccordionChange = (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    if (expanded) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };

  return (
    <>
      <CustomAppBar />

      <div className="px-10 py-6">
        <CustomBreadcrumbs page="Incidents" />
      </div>

      <div className="px-10">
        <div className="flex justify-end">
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

        <Accordion
          className="my-5"
          expanded={expanded}
          onChange={handleAccordionChange}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">Search and Filter</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SearchAndFilter
              searchText={searchText}
              incidentType={incidentType}
              status={status}
              page={page}
              sortByCreatedAt={sortByCreatedAt}
              sortByUpdatedAt={sortByUpdatedAt}
              totalPageCount={totalPageCount}
              handlePageChange={handlePageChange}
              handleSortByCreatedAt={handleSortByCreatedAt}
              handleSortByUpdatedAt={handleSortByUpdatedAt}
              handleIncidentTypeChange={handleIncidentTypeChange}
              handleStatusChange={handleStatusChange}
              handleSearchTextChange={handleSearchTextChange}
              handleClearFilterClick={handleClearFilterClick}
            />
          </AccordionDetails>
        </Accordion>

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
                    value={
                      createIncidentIncidentType
                        ? createIncidentIncidentType
                        : ''
                    }
                    label="Incident Type"
                    onChange={handleCreateIncidentIncidentTypeChange}
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
