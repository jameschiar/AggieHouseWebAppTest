import React from 'react';
import { useEffect } from 'react';
import './css/Login.css';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';

function Login() {

  return (
    <main>
      <div id="logo">
        <div>
          <h4 className="logo-header">Aggie House</h4>
          <hr />
          <p className="logo-subheader">aggiehousedavis@gmail.com</p>
        </div>
        <img className="logo-img" src={logo} width="75px" />
      </div>
      <div id="login">
        <h4 className="header">Account Log-in</h4>
        <p className="login-info">Enter your account information to get access to volunteer resources </p>
        <hr />
        <div className="google-login-button">Login</div>
        <Link to="/dashboard"> Link to access other pages </Link>
      </div>

    </main>
  );
};

export default Login;