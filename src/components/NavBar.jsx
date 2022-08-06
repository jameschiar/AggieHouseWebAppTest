import React from "react";
import logo from "../images/logo.svg";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserProvider.jsx";

function NavBar() {
  const { user } = useContext(UserContext);

  return (
    <div id="navbar">
      <Link to="/dashboard">
        <img src={logo} id="logo" />
      </Link>

      <div className="nav">
        <p>
          <Link to="/calendar">
            {" "}
            <button className="nav-links">Calendar </button>
          </Link>
        </p>
        <p>
          <Link to="/attendance">
            {" "}
            <button className="nav-links">Attendance </button>
          </Link>
        </p>
        <p>
          <Link to="/todo">
            {" "}
            <button className="nav-links">To-Do </button>{" "}
          </Link>
        </p>
      </div>

      <div className="account">
        <Link to="/account">
          <img id="pfp" src={user.photoURL} />
        </Link>
        <Link to="/account">{user.displayName} </Link>
      </div>
    </div>
  );
}

export default NavBar;
