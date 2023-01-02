import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple, lightBlue } from '@mui/material/colors';
import MainView from '../components/mainView/MainView';
import Signup from '../components/signup/Signup';
import Login from '../components/login/Login';
import Profile from '../components/profile/Profile';
import Settings from '../components/settings/Settings';
import IncidentDetail from '../components/incidentDetail/IncidentDetail';
import PrivateRoute from '../components/privateRoute/PrivateRoute';
import { Url } from '../helper/url';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[400],
    },
    secondary: {
      main: lightBlue[500],
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path={Url.HOME} element={<MainView />} />
        <Route path={Url.SIGN_UP} element={<Signup />} />
        <Route path={Url.LOGIN} element={<Login />} />
        <Route
          path={Url.INCIDENTS}
          element={
            <PrivateRoute>
              <MainView />
            </PrivateRoute>
          }
        />
        <Route
          path={Url.INCIDENT_DETAIL}
          element={
            <PrivateRoute>
              <IncidentDetail />
            </PrivateRoute>
          }
        />
        <Route
          path={Url.PROFILE}
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path={Url.SETTINGS}
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
