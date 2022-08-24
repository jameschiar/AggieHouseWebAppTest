import React from "react";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";

const Unauthorized = () => {
  const { logoutGoogle } = useUser();
  const navigate = useNavigate();

  const redirectAndLogout = () => {
    logoutGoogle();
    navigate("/login");
  };

  return (
    <>
      <div>Error: Unauthorized</div>
      <button onClick={redirectAndLogout}>Back to login page</button>
    </>
  );
};

export default Unauthorized;
