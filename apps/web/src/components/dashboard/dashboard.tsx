import React from 'react';
import CustomAppBar from '../customAppBar/CustomAppBar';
import { UserRole } from '@prisma/client';
import AdminDashboard from '../adminDashboard/AdminDashboard';
import NormalUserDashboard from '../normalUserDashboard/NormalUserDashboard';

function Dashboard() {
  const renderDashboard = () => {
    let dashboard;

    const userRole = localStorage.getItem('userRole');
    if (userRole) {
      if (userRole === UserRole.ADMIN) {
        dashboard = <AdminDashboard />;
      } else if (userRole === UserRole.NORMAL_USER) {
        dashboard = <NormalUserDashboard />;
      }
    }

    return dashboard;
  };

  return (
    <>
      <CustomAppBar />
      {renderDashboard()}
    </>
  );
}

export default Dashboard;
