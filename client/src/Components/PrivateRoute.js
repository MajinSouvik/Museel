import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { isAuthenticated } from "../services/authService"; 

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      {children}
      <Outlet />
    </>
  );
};

export default PrivateRoute;