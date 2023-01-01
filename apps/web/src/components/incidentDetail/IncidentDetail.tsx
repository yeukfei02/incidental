import React from 'react';
import CustomAppBar from '../customAppBar/CustomAppBar';
import { useParams } from 'react-router';

function IncidentDetail() {
  const { id } = useParams();

  console.log('id = ', id);

  return (
    <>
      <CustomAppBar />
      IncidentDetail
    </>
  );
}

export default IncidentDetail;
