import React, { useEffect } from "react";

import NavBar from "../components/NavBar";
import { Outlet, Link } from "react-router-dom";

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
      <Link to="/alerts">
        <button>Manage Alerts</button>
      </Link>
      <Outlet />
    </div>
  );
}

export default Admin;
