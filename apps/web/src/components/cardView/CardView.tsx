import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Incident, UserRole } from '@prisma/client';
import { useNavigate } from 'react-router-dom';
import { Url } from '../../helper/url';

interface Props {
  incident: Incident;
}

function CardView({ incident }: Props) {
  const navigate = useNavigate();

  const handleViewDetailsClick = () => {
    navigate(Url.INCIDENT_DETAIL.replace(':id', incident.id), {
      state: {
        id: incident.id,
      },
    });
  };

  const handleAssignClick = () => {
    console.log('assign');
  };

  const handleAcknowledgeClick = () => {
    console.log('acknowledge');
  };

  const handleResolveClick = () => {
    console.log('resolve');
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

  return (
    <Card className="my-3">
      <CardContent>
        <Typography variant="h5" component="div">
          {incident.title}
        </Typography>
        <div className="mt-3">
          <Typography color="text.secondary" variant="body2">
            {incident.description}
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
  );
}

export default CardView;
