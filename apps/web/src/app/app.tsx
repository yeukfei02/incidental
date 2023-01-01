import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple, lightBlue } from '@mui/material/colors';
import MainView from '../components/mainView/MainView';
import Signup from '../components/signup/Signup';
import Login from '../components/login/Login';
import { Url } from '../helper/url';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[400],
    },
    secondary: {
      main: lightBlue[400],
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
      </Routes>
    </ThemeProvider>
  );
}

export default App;
