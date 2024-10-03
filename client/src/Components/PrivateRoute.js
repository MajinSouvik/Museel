// PrivateRoute.js
import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { isAuthenticated } from "../services/authService"; // Your authentication service

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the children and the Outlet for nested routes
  return (
    <>
      {children}
      <Outlet />
    </>
  );
};

export default PrivateRoute;