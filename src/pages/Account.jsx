import React from "react";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import "./css/Account.css";

import { useContext } from "react";
import UserContext from "../context/UserProvider.jsx";

// firestore
import { db } from "../firebase-config.js";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";

function Account() {
  const [userData, setUserData] = useState({});
  const [pronoun, setPronoun] = useState("");
  const [number, setNumber] = useState();
  const [showPronounForm, togglePronounForm] = useState(false);
  const [showNumberForm, toggleNumberForm] = useState(false);

  const { user } = useContext(UserContext); // user from auth
  const userDocRef = doc(db, "users", user.uid);

  useEffect(() => {
    // get data fields of current user
    getDoc(userDocRef).then((data) => {
      setUserData(data.data());
    });
  }, [showPronounForm, showNumberForm]);

  const updatePronouns = async () => {
    const newFields = { pronouns: pronoun };
    await updateDoc(userDocRef, newFields);
    togglePronounForm(false);
  };

  const updateNumber = async () => {
    const newFields = { phoneNumber: number };
    await updateDoc(userDocRef, newFields);
    toggleNumberForm(!showNumberForm);
  };

  const logoutGoogle = () => {
    signOut(auth)
      .then(() => {
        console.log("signout success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main>
      <NavBar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="container">
          <div className="account-container">
            <div className="profile-picture">
              <img
                src={user.photoURL}
                referrerPolicy="no-referrer"
                width="350px"
                height="350px"
              />
            </div>
            <div className="account-info">
              <div>
                <p> Name: {user.displayName} </p>
              </div>
              <div>
                <p>Pronouns: {userData.pronouns}</p>
                {!showPronounForm && (
                  <button
                    onClick={() => {
                      togglePronounForm(!showPronounForm);
                    }}
                  >
                    Change Pronouns
                  </button>
                )}
                {showPronounForm && (
                  <input
                    placeholder="Pronouns"
                    onChange={(event) => {
                      setPronoun(event.target.value);
                    }}
                  />
                )}
                {showPronounForm && (
                  <button onClick={updatePronouns}>Submit</button>
                )}
              </div>
              <div>
                <p>Number: {userData.phoneNumber}</p>
                {!showNumberForm && (
                  <button
                    onClick={() => {
                      toggleNumberForm(!showNumberForm);
                    }}
                  >
                    Change Number
                  </button>
                )}
                {showNumberForm && (
                  <input
                    placeholder="e.g. +11231231234"
                    type="tel"
                    onChange={(event) => {
                      setNumber(event.target.value);
                    }}
                  />
                )}
                {showNumberForm && (
                  <button onClick={updateNumber}>Submit</button>
                )}
              </div>
              <div>
                <p>Email: {user.email}</p>
              </div>
            </div>
          </div>
          <div className="upcoming-shifts">
            <p>upcoming shifts:</p>
          </div>
        </div>
      </div>
      <button id="logout" onClick={logoutGoogle}>
        logout
      </button>
    </main>
  );
}

export default Account;
