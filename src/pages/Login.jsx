import React from "react";
import "./css/Login.css";
import logo from "../images/logo.png";
import { useUser } from "../context/UserProvider";

function Login() {
  const { signInWithGoogle } = useUser();
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
      <div id="login-div">
        <h4 className="header">Account Log-in</h4>
        <p className="login-info">
          Enter your account information to get access to volunteer resources{" "}
        </p>
        <hr />
        <button className="google-login-button" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </main>
  );
}

export default Login;
