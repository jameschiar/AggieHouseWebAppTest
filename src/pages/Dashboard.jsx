import React from 'react';
import "./Dashboard.css";
import NavBar from "../components/NavBar.jsx"
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <main>
      
      <NavBar/>
      
      
      <div id = "dash">
        <h2 class = "greeting">Hello Christopher Columbus,</h2>
        <h3 class = "modules">Upcoming Shift
        <p class ="info">upcoming shift date and time imported here</p></h3>
        <h4 class = "modules">Alerts
        <p class ="info">alerts imported here</p></h4>
        <h4 class = "modules">Available Shifts
        <p class ="info">List of Available shifts</p></h4>
        <hr />
      </div>
      
    </main>
  );
}

export default Dashboard;
