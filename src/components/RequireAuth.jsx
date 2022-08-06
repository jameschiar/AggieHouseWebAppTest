// wrap this component around pages that require a user to be logged in

import React, { useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../pages/Loading";
import { useEffect } from "react";

const RequireAuth = () => {
  const location = useLocation();
  const [userState, setUserState] = useState("unknown");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
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
