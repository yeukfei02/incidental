import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardView from '../cardView/CardView';
import { Incident } from '@prisma/client';
import * as userService from '../../services/userService';

interface Props {
  incidents: Incident[];
  getIncidents: () => Promise<void>;
}

function IncidentCardList({ incidents, getIncidents }: Props) {
  const [normalUsers, setNormalUsers] = useState([]);

  useEffect(() => {
    getNormalUsers();
  }, []);

  const getNormalUsers = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await userService.getNormalUsers(token);
      console.log('response = ', response);

      if (response) {
        const responseData = response.data;
        if (responseData) {
          setNormalUsers(responseData.users);
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
            <CardView
              incident={incident}
              normalUsers={normalUsers}
              getIncidents={getIncidents}
            />
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
    </Box>
  );
}

export default IncidentCardList;
