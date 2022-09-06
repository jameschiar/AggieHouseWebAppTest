import React from "react";

import NavBar from "../components/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Admin() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <NavBar />
      <Link to="/manageusers">
        <button>Manage Users</button>
      </Link>
      <Link to="/lock">
        <button>Manage Locker Code</button>
      </Link>
      <Outlet />
    </div>
  );
}

export default Admin;
