import React from "react";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import "./css/Account.css";

import { useContext } from "react";
import UserContext from "../context/UserProvider.jsx";

// firestore
import { db } from "../firebase-config.js";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

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

  return (
    <main>
      <NavBar />
      <div className="container">
        <div className="account-container">
          <div className="profile-picture">
            <img src={user.photoURL} width="350px" height="350px" />
          </div>
          <div className="account-info">
            <p> Name: {user.displayName} </p>
            <p>
              {" "}
              Pronouns: {userData.pronouns}
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
            </p>
            <p>
              {" "}
              Number: {userData.phoneNumber}
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
                  placeholder="Number"
                  type="tel"
                  onChange={(event) => {
                    setNumber(event.target.value);
                  }}
                />
              )}
              {showNumberForm && <button onClick={updateNumber}>Submit</button>}
            </p>
            <p> Email: {user.email} </p>
          </div>
        </div>
        <div className="upcoming-shifts">
          <p>upcoming shifts:</p>
        </div>
      </div>
    </main>
  );
}

export default Account;
