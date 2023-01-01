import React from 'react';
import Login from '../login/login';
import Dashboard from '../dashboard/dashboard';

function MainView() {
  const renderMainView = () => {
    let mainView = <Login />;

    const token = localStorage.getItem('token');
    if (token) {
      mainView = <Dashboard />;
    }

    return mainView;
  };

  return renderMainView();
}

export default MainView;
