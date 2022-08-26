import React from "react";
import logo from "../images/logo.svg";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserProvider.jsx";

function NavBar() {
  const { user } = useUser();

  return (
    <div id="navbar">
      <div style={{ display: "flex" }}>
        <Link to="/dashboard">
          <img src={logo} id="logo" />
        </Link>

        <div className="nav">
          <p>
            <Link to="/calendar">
              <button className="nav-links">Calendar </button>
            </Link>
          </p>
          <p>
            <Link to="/attendance">
              <button className="nav-links">Attendance </button>
            </Link>
          </p>
          <p>
            <Link to="/todo">
              <button className="nav-links">To-Do </button>{" "}
            </Link>
          </p>
          <p>
            <Link to="/resources">
              {" "}
              <button className="nav-links">Resources </button>{" "}
            </Link>
          </p>
        </div>
      </div>

      <div className="account">
        <Link to="/account">
          <img id="pfp" src={user.photoURL} referrerPolicy="no-referrer" />
        </Link>
        <Link to="/account">{user.displayName} </Link>
      </div>
    </div>
  );
}

export default NavBar;
