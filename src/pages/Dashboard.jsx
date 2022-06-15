import React from 'react';
import "./Dashboard.css";
import accountImg from "../images/accountpic.png"

import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <main>
      
      <div id = "navbar">
        <div class = "nav">
          <p><Link to="/calendar"> <button class ="nav-links">Calendar </button></Link></p>
          <p><Link to="/attendance"> <button class ="nav-links">Attendance </button></Link></p>
          <p><Link to="/todo"> <button class ="nav-links">To-Do </button> </Link></p>
        </div>
        <div class = "account">
          <img src={accountImg} width = "40px" height = "40px"/>
          <h2> Name</h2>
        </div>
      </div>
      
      <div id = "dash">
        <h2 class = "greeting">Hello [insert name],</h2>
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
