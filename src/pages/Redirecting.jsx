import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../context/UserProvider";

const Redirecting = () => {
  const { userFirebaseData } = useUser();
  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };
  console.log(userFirebaseData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEmpty(userFirebaseData)) {
      navigate("/dashboard");
    }
  }, [userFirebaseData]);

  return <div>Redirecting...</div>;
};

export default Redirecting;
