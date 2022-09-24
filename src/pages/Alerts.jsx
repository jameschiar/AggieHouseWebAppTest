import React, { useState } from "react";
//import "./css/Alerts.css";
import NavBar from "../components/NavBar.jsx";
import SMSIndividual from "../components/SMSIndividual.jsx";
import SMSAll from "../components/SMSAll.jsx";
import AdminDashAlerts from "../components/AdminDashAlerts.jsx";
import "./css/Locker.css";
import styled from 'styled-components';

function Alerts() {
  const [deleteState, toggleDeleteState] = useState(false);

  return (
    <main>
      <NavBar />
      <div style={{ marginLeft: "20px" }}>
        <Header>Edit Dashboard Alerts for All Volunteers</Header>
        <AdminDashAlerts deleteState={deleteState} />
        <button
          style={{ marginTop: "5px" }}
          className="mini-button"
          onClick={() => {
            toggleDeleteState(!deleteState);
          }}
        >
          Delete Alert
        </button>
        <SMSAll />

        <SMSIndividual />
      </div>
    </main>
  );
}
export default Alerts;

const Header = styled.h3`
  text-transform: uppercase;
  letter-spacing: 1px;
`