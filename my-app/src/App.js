//App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';  
import TripDetails from './components/TripDetails';
import Signup from './components/Signup';  
 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} /> {/* Landing Page for Signup */}
        <Route path="/login" element={<Login />} /> {/* Login Page */}
        <Route path="/trips" element={<TripDetails />} /> {/* TripDetails Page */}
      </Routes>
    </Router>
  );
};

export default App; 