// wrap this component around pages that require a user to be logged in

import React, { useState, useContext, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../pages/Loading";

import UserContext from "../context/UserProvider";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const [userState, setUserState] = useState("unknown");
  const { user, setUser } = useContext(UserContext); // current user from auth

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUserState("true");
      } else {
        setUserState("false");
      }
    });
  }, []);

  // if user is authenticated, display private pages
  // else navigate to login page
  if (userState === "unknown") {
    return <Loading />;
  } else if (userState === "true") {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
