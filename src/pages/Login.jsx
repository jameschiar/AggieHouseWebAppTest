import React from "react";
import "./css/Login.css";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

// firebase login
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase-config";

// db
// firestore database
import { db } from "../firebase-config.js";
import { getDoc, setDoc, doc } from "firebase/firestore";

function Login() {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        // adds user to firestore database in collection "users"
        const addUser = async () => {
          try {
            await setDoc(doc(db, "users", user.uid), {
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            });
          } catch (e) {
            console.log(e);
          }
        };

        // check if user already exists in database
        const usersRef = doc(db, "users", user.uid);
        getDoc(usersRef).then((docSnapshot) => {
          if (!docSnapshot.exists()) {
            addUser();
            console.log("adding user");
          }
        });
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
