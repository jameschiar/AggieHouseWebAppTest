import React, { useState, useEffect } from "react";
//import "./css/Alerts.css";
import NavBar from "../components/NavBar.jsx";
import SMSIndividual from "../components/SMSIndividual.jsx";
import SMSAll from "../components/SMSAll.jsx";
import AdminDashAlerts from "../components/AdminDashAlerts.jsx";
import "./css/Locker.css";

function Alerts() {

  const [deleteState, toggleDeleteState] = useState(false);

return (
    <main>
      <NavBar/>
      <div style={{ marginLeft: "20px" }}>
        <h2>Edit Dashboard Alerts for All Volunteers</h2>
        <AdminDashAlerts 
            deleteState={deleteState}
          />
        <button
          style={{ marginTop: "5px" }}
          className='mini-button'
          onClick={() => {
            toggleDeleteState(!deleteState);
          }}>
          Delete Alert
        </button>
        <SMSAll/>
         
        <SMSIndividual/>
      </div>
    </main>
  );
}
export default Alerts;