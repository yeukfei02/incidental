import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import CustomSnackBar from '../customSnackBar/CustomSnackBar';
import { Incident, IncidentType, Status, User, UserRole } from '@prisma/client';
import { useNavigate } from 'react-router-dom';
import { Url } from '../../helper/url';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import * as incidentService from '../../services/incidentService';

dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
  incident: Incident;
  normalUsers: User[];
  getIncidents: () => Promise<void>;
}

function CardView({ incident, normalUsers, getIncidents }: Props) {
  const navigate = useNavigate();
  const [dialogText, setDialogText] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const [snackbarText, setSnackbarText] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [assigneeId, setAssigneeId] = useState('');

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleAssigneeChange = (event: SelectChangeEvent) => {
    setAssigneeId(event.target.value as IncidentType);
  };

  const handleViewDetailsClick = () => {
    navigate(Url.INCIDENT_DETAIL.replace(':id', incident.id), {
      state: {
        id: incident.id,
      },
    });
  };

  const handleAssignClick = () => {
    setDialogOpen(true);
    setDialogText('Assign User');
  };

  const handleDeleteButtonClick = () => {
    setDialogOpen(true);
    setDialogText('Delete Incident');
  };

  const handleAcknowledgeClick = () => {
    setDialogOpen(true);
    setDialogText('Acknowledge');
  };

  const handleResolveClick = () => {
    setDialogOpen(true);
    setDialogText('Resolve');
  };

  const handleAssignUser = async () => {
    const token = localStorage.getItem('token');
    if (token && incident) {
      const response = await incidentService.assignIncident(
        token,
        incident.id,
        assigneeId
      );
      console.log('response = ', response);

      if (response) {
        const responseData = response.data;
        if (responseData) {
          setDialogOpen(false);
          setSnackbarOpen(true);
          setSnackbarText('Assign incident');

          await getIncidents();
        }
      }
    }
  };

  const handleDeleteIncident = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await incidentService.deleteIncidentById(
        token,
        incident.id
      );
      console.log('response = ', response);

      if (response) {
        const responseData = response.data;
        if (responseData) {
          setDialogOpen(false);
          setSnackbarOpen(true);
          setSnackbarText('Delete Incident');
          await getIncidents();
        }
      }
    }
  };

  const handleAcknowledgeIncident = async () => {
    console.log('acknowledge incident api');
  };

  const handleResolveIncident = async () => {
    console.log('resolve incident api');
  };

  const renderCardButton = () => {
    let cardButton;

    const userRole = localStorage.getItem('userRole');
    if (userRole === UserRole.ADMIN) {
      if (incident.status !== Status.ASSIGNED) {
        cardButton = (
          <Button
            size="large"
            color="primary"
            onClick={() => handleAssignClick()}
          >
            Assign
          </Button>
        );
      }
    } else if (userRole === UserRole.NORMAL_USER) {
      cardButton = (
        <>
          {incident.status !== Status.ACKNOWLEDGED ? (
            <Button
              size="large"
              color="primary"
              onClick={() => handleAcknowledgeClick()}
            >
              Acknowledge
            </Button>
          ) : null}
          {incident.status !== Status.RESOLVED ? (
            <Button
              size="large"
              color="success"
              onClick={() => handleResolveClick()}
            >
              Resolve
            </Button>
          ) : null}
        </>
      );
    }

    return cardButton;
  };

  const renderNormalUsersDropdown = () => {
    let normalUsersDropdown;

    if (normalUsers) {
      normalUsersDropdown = normalUsers.map((user: User, i: number) => {
        return (
          <MenuItem key={i} value={user.id}>
            {user.name}
          </MenuItem>
        );
      });
    }

    return normalUsersDropdown;
  };

  const getTimeDiffStr = () => {
    const now = dayjs().tz('Asia/Hong_Kong');
    const incidentCreatedDate = dayjs(incident.created_at).tz('Asia/Hong_Kong');

    const minutesDiff = now.diff(incidentCreatedDate, 'minutes');
    const timeDiffStr = `${minutesDiff} minutes ago`;
    return timeDiffStr;
  };

  return (
    <>
      <Card className="p-3 my-3">
        <div className="flex justify-end m-1">
          <CloseIcon
            className="cursor-pointer"
            onClick={() => handleDeleteButtonClick()}
          />
        </div>
        <CardContent>
          <Typography variant="h5" component="div">
            {incident.title}
          </Typography>
          <div className="my-4">
            <Typography color="text.secondary" variant="body2">
              {incident.description}
            </Typography>
          </div>
          <div className="flex flex-row items-center">
            <div>
              <Chip
                label={incident.type}
                color={
                  incident.type === IncidentType.HIGH
                    ? 'error'
                    : incident.type === IncidentType.MEDIUM
                    ? 'warning'
                    : 'info'
                }
              />
            </div>
            <div className="mx-2">
              <Chip
                label={incident.status}
                color={
                  incident.status === Status.UNASSIGNED
                    ? 'warning'
                    : incident.status === Status.ASSIGNED
                    ? 'primary'
                    : incident.status === Status.ACKNOWLEDGED
                    ? 'info'
                    : incident.status === Status.RESOLVED
                    ? 'success'
                    : 'default'
                }
                variant="outlined"
              />
            </div>
          </div>

          <div className="mt-3">
            <Typography
              className="italic"
              color="text.secondary"
              variant="subtitle2"
            >
              {getTimeDiffStr()}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button
            size="large"
            color="secondary"
            onClick={() => handleViewDetailsClick()}
          >
            View Details
          </Button>
          {renderCardButton()}
        </CardActions>
      </Card>

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
            onClick={() => handleDialogClose()}
          />
        </div>
        <DialogTitle id="alert-dialog-title">{dialogText}</DialogTitle>
        <DialogContent>
          {dialogText === 'Assign User' ? (
            <Box>
              <div>
                <FormControl className="w-full">
                  <InputLabel id="demo-simple-select-helper-label">
                    Normal Users
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={assigneeId}
                    label="Incident Type"
                    onChange={handleAssigneeChange}
                  >
                    {renderNormalUsersDropdown()}
                  </Select>
                </FormControl>
              </div>
            </Box>
          ) : dialogText === 'Delete Incident' ? (
            <Typography color="text.secondary" variant="body1">
              Are you sure want to remove this incident?
            </Typography>
          ) : dialogText === 'Acknowledge' ? (
            <Typography color="text.secondary" variant="body1">
              Are you sure want to acknowledge this incident?
            </Typography>
          ) : dialogText === 'Resolve' ? (
            <Typography color="text.secondary" variant="body1">
              Are you sure want to resolve this incident?
            </Typography>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button
            onClick={
              dialogText === 'Assign User'
                ? () => handleAssignUser()
                : dialogText === 'Delete Incident'
                ? () => handleDeleteIncident()
                : dialogText === 'Acknowledge'
                ? () => handleAcknowledgeIncident()
                : dialogText === 'Resolve'
                ? () => handleResolveIncident()
                : undefined
            }
          >
            {dialogText}
          </Button>
        </DialogActions>
      </Dialog>

      <CustomSnackBar
        type={snackbarText}
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
      />
    </>
  );
}

export default CardView;
