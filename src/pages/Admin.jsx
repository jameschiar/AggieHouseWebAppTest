import React from "react";

import NavBar from "../components/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Admin() {
  return (
    <div>
      <NavBar />
      <Link to="/manageusers">
        <button>Manage Users</button>
      </Link>
      <Outlet />
    </div>
  );
}

export default Admin;
