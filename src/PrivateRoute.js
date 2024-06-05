import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('accessToken'); // Check if user is authenticated

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;