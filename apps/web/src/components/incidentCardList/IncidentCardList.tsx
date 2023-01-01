import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CustomSnackBar from '../customSnackBar/CustomSnackBar';
import CardView from '../cardView/CardView';
import { Incident, UserRole } from '@prisma/client';
import * as incidentService from '../../services/incidentService';

interface Props {
  token: string | null;
  userRole: string | null;
  userId: string | null;
  searchText: string;
}

function IncidentCardList({ token, userRole, userId, searchText }: Props) {
  const [incidents, setIncidents] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    getIncidents();
  }, []);

  const getIncidents = async () => {
    if (token && userRole && userId) {
      const response = await incidentService.getIncidents(
        token,
        userRole as UserRole,
        userId
      );
      console.log('response = ', response);

      if (response) {
        const responseData = response.data;
        if (responseData) {
          setSnackbarOpen(true);
          setIncidents(responseData.incidents);
        }
      }
    }
  };

  const renderIncidentCardList = (incidents: Incident[]) => {
    let incidentCardList;

    if (incidents) {
      incidentCardList = incidents.map((incident, i) => {
        return (
          <Grid key={i} item xs={12} sm={4} className="p-3">
            <CardView incident={incident} />
          </Grid>
        );
      });
    }

    return incidentCardList;
  };

  return (
    <Box className="my-5" sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {renderIncidentCardList(incidents)}
      </Grid>

      <CustomSnackBar
        type="Get incidents"
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
      />
    </Box>
  );
}

export default IncidentCardList;
