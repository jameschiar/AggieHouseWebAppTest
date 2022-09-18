import React, { useEffect } from "react";

import NavBar from "../components/NavBar";
import { Outlet, Link } from "react-router-dom";

import "./css/Resources.css";

function Admin() {
  return (
    <div>
    <NavBar />
    <div style={{ display: "flex", flexDirection: "column", margin: '15px'}}>
      <h2> Admin Management</h2>
      <Link to="/manageusers">
        <button className='addButton'>Manage Users</button>
      </Link>
      <Link to="/lock">
        <button className='addButton'>Manage Locker Code</button>
      </Link>
      <Link to="/alerts">
        <button className='addButton'>Manage Alerts</button>
      </Link>
      <Outlet />
    </div>
  </div>
  );
}

export default Admin;
