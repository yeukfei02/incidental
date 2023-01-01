import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from '../components/signup/signup';
import Login from '../components/login/login';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
