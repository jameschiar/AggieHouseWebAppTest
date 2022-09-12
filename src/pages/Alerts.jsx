import React, { useState, useEffect } from "react";
//import "./css/Alerts.css";
import NavBar from "../components/NavBar.jsx";
import SMSIndividual from "../components/SMSIndividual.jsx";
import AdminDashAlerts from "../components/AdminDashAlerts.jsx";

function Alerts() {

return (
    <main>
      <NavBar/>
      <div style={{ marginLeft: "20px" }}>
        <h2>Edit Dashboard Alerts for all Volunteers</h2>
        <AdminDashAlerts />
         
        <SMSIndividual/>
      </div>
    </main>
  );
}
export default Alerts;