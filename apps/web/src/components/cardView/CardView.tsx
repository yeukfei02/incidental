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
import { Incident, IncidentType, Status, User, UserRole } from '@prisma/client';
import { useNavigate } from 'react-router-dom';
import { Url } from '../../helper/url';

interface Props {
  incident: Incident;
  normalUsers: User[];
}

function CardView({ incident, normalUsers }: Props) {
  const navigate = useNavigate();
  const [dialogText, setDialogText] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const [normalUser, setNormalUser] = useState('');

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleNormalUsersChange = (event: SelectChangeEvent) => {
    setNormalUser(event.target.value as IncidentType);
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
    console.log('acknowledge');
  };

  const handleResolveClick = () => {
    console.log('resolve');
  };

  const handleAssignUser = async () => {
    console.log('assign user api');
  };

  const handleDeleteIncident = async () => {
    console.log('delete incident api');
  };

  const renderCardButton = () => {
    let cardButton;

    const userRole = localStorage.getItem('userRole');
    if (userRole === UserRole.ADMIN) {
      cardButton = (
        <Button
          size="large"
          color="primary"
          onClick={() => handleAssignClick()}
        >
          Assign
        </Button>
      );
    } else if (userRole === UserRole.NORMAL_USER) {
      cardButton = (
        <>
          <Button
            size="large"
            color="primary"
            onClick={() => handleAcknowledgeClick()}
          >
            Acknowledge
          </Button>
          <Button
            size="large"
            color="primary"
            onClick={() => handleResolveClick()}
          >
            Resolve
          </Button>
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
                    value={normalUser}
                    label="Incident Type"
                    onChange={handleNormalUsersChange}
                  >
                    {renderNormalUsersDropdown()}
                  </Select>
                </FormControl>
              </div>
            </Box>
          ) : dialogText === 'Delete Incident' ? (
            <div>Are you sure want to remove this incident?</div>
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
                : undefined
            }
          >
            {dialogText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CardView;
