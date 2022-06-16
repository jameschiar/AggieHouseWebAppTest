import React from 'react';
import accountImg from "../images/accountpic.png"
import logo from "../images/logo.svg"
import "./NavBar.css"
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div id="navbar">
      <Link to="/dashboard"><img src={logo} id="logo"/></Link>
      <div class="nav">
        <p><Link to="/calendar"> <button class="nav-links">Calendar </button></Link></p>
        <p><Link to="/attendance"> <button class="nav-links">Attendance </button></Link></p>
        <p><Link to="/todo"> <button class="nav-links">To-Do </button> </Link></p>
      </div>
      <div class="account">
        <img src={accountImg} width="40px" height="40px" />
        <h2> Christopher Columbus</h2>
      </div>
    </div>
  );
}

export default NavBar;