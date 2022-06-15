import React from 'react';
import './Login.css';
import logo from '../images/logo.png';

function Login() {
  return (
    <div id="logo">
          <div>
            <h4 class="logo-header">Aggie House</h4>
            <hr/>
            <p class="logo-subheader">aggiehousedavis@gmail.com</p>
          </div>
        <img class="logo-img" src={logo} width="75px"/>
        <div id="login">
          <h4 class="header">Account Log-in</h4>
          <p class="login-info">Enter your account information to get access to volunteer resources </p> 
          <hr />
          <div id="google-login">
            <button>placeholder for login button</button>
          </div>
        </div>
      </div>
  );
};

export default Login;