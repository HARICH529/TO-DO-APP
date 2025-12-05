import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import UserProfile from './UserProfile.jsx'

const RootLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = (loginData) => {
    setIsLoggedIn(true);
    setUserData(loginData);
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Container className="mt-4" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 50%, #fff3e0 100%)', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={isLoggedIn ? <UserProfile userData={userData} /> : <Navigate to="/login" replace />} />
        </Routes>
      </Container>
    </>
  );
};

export default RootLayout;