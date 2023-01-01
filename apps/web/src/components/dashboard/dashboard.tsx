import React, { useState } from 'react';
import CustomAppBar from '../customAppBar/CustomAppBar';
import CustomSnackBar from '../customSnackBar/CustomSnackBar';
import * as incidentService from '../services/incidentService';

function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CustomAppBar />
      
      
      <CustomSnackBar type="Create incident" open={open} setOpen={setOpen} />
    </>
  );
}

export default Dashboard;
