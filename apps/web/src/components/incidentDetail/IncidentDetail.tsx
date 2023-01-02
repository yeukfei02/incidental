import React, { useEffect, useState } from 'react';
import CustomAppBar from '../customAppBar/CustomAppBar';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useParams } from 'react-router';
import * as incidentService from '../../services/incidentService';
import { Incident, IncidentType, Status } from '@prisma/client';
import CustomBreadcrumbs from '../customBreadcrumbs/CustomBreadcrumbs';

function IncidentDetail() {
  const { id } = useParams();

  const [incident, setIncident] = useState<Incident>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [incidentType, setIncidentType] = useState<IncidentType>(
    IncidentType.MEDIUM
  );
  const [status, setStatus] = useState<Status>(Status.UNASSIGNED);

  useEffect(() => {
    if (id) {
      getIncidentById(id);
    }
  }, [id]);

  const getIncidentById = async (id: string) => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await incidentService.getIncidentById(token, id);
      console.log('response = ', response);

      if (response) {
        const responseData = response.data;
        if (responseData) {
          setIncident(responseData.incident);
          setTitle(responseData.incident.title);
          setDescription(responseData.incident.description);
          setIncidentType(responseData.incident.type);
          setStatus(responseData.incident.status);
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

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as Status);
  };

  const handleUpdateIncidentClick = () => {
    console.log('update incident api');
  };

  const renderIncidentDetailView = () => {
    let incidentDetailView;

    if (incident) {
      incidentDetailView = (
        <Container className="mx-10" component="main" maxWidth="md">
          <Card className="p-5">
            <div className="my-3">
              <Typography variant="h5" component="div">
                Incident Details
              </Typography>
            </div>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              type="text"
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
            <div className="mt-5">
              <FormControl className="w-full">
                <InputLabel id="demo-simple-select-helper-label">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={status}
                  label="Status"
                  onChange={handleStatusChange}
                >
                  <MenuItem value={Status.UNASSIGNED}>Unassigned</MenuItem>
                  <MenuItem value={Status.ASSIGNED}>Assigned</MenuItem>
                  <MenuItem value={Status.ACKNOWLEDGED}>Acknowledged</MenuItem>
                  <MenuItem value={Status.RESOLVED}>Resolved</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="mt-1">
              <TextField
                margin="normal"
                fullWidth
                id="creator"
                label="Creator"
                name="creator"
                type="text"
                autoComplete="creator"
                value={
                  (incident as any) && (incident as any).creator
                    ? (incident as any).creator.name
                    : ''
                }
                disabled
              />
            </div>
            <TextField
              margin="normal"
              fullWidth
              id="assignee"
              label="Assignee"
              name="assignee"
              type="text"
              autoComplete="assignee"
              value={
                (incident as any) && (incident as any).assignee
                  ? (incident as any).assignee.name
                  : ''
              }
              disabled
            />
            <Button
              fullWidth
              color="primary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleUpdateIncidentClick()}
            >
              Update Incident
            </Button>
          </Card>
        </Container>
      );
    }

    return incidentDetailView;
  };

  return (
    <>
      <CustomAppBar />

      <div className="px-10 py-6">
        <CustomBreadcrumbs
          page="Incidents"
          subPage="Incident Detail"
          incidentId={incident ? (incident as any).id : ''}
        />
      </div>

      {renderIncidentDetailView()}
    </>
  );
}

export default IncidentDetail;
