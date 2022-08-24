// wrap this component around pages that require a user to be logged in

import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useUser } from "../context/UserProvider";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { user, userFirebaseData } = useUser(); // current user from auth

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  // the user can access pages based on their role
  const isAuthorized = () => {
    return userFirebaseData?.roles?.find((role) =>
      allowedRoles?.includes(role)
    );
  };

  // if user is authenticated, display private pages
  // else navigate to login page

  return isAuthorized() ? (
    <Outlet />
  ) : user && !isEmpty(user) ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
