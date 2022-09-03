import React from "react";
import logo from "../images/logo.svg";
import "./css/NavBar.css";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserProvider.jsx";

function NavBar() {
  const { userFirebaseData } = useUser();

  const isAdmin = () => {
    return userFirebaseData?.role === "admin";
  };

  return (
    <div id="navbar">
      <div style={{ display: "flex" }}>
        <Link to="/">
          <img src={logo} id="logo" />
        </Link>

        <div className="nav">
          <Link to="/calendar">
            <button className="nav-links">Calendar </button>
          </Link>

          <Link to="/attendance">
            <button className="nav-links">Attendance </button>
          </Link>

          <Link to="/todo">
            <button className="nav-links">To-Do </button>
          </Link>

          <Link to="/resources">
            <button className="nav-links">Resources </button>
          </Link>

          {isAdmin() && (
            <Link to="/admin">
              <button className="nav-links">Admin </button>
            </Link>
          )}
        </div>
      </div>

      <div className="account">
        <Link to="/account">
          <img
            id="pfp"
            src={userFirebaseData.photoURL}
            referrerPolicy="no-referrer"
          />
        </Link>
        <Link to="/account">{userFirebaseData.displayName} </Link>
      </div>
    </div>
  );
}

export default NavBar;
