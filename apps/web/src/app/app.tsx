import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainView from '../components/mainView/MainView';
import Signup from '../components/signup/Signup';
import Login from '../components/login/Login';
import { Url } from '../helper/url';

function App() {
  return (
    <div>
      <Routes>
        <Route path={Url.HOME} element={<MainView />} />
        <Route path={Url.SIGN_UP} element={<Signup />} />
        <Route path={Url.LOGIN} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
