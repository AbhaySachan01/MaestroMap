import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Import your page components
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import Signin from './components/Signin';
import VerifyEmail from './components/verifyEmail';
import RoutePlanner from './components/RoutePlanner';



function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/find" element={<RoutePlanner />} />
      
    </Routes>
  );
}

export default App;