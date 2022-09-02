import React from "react";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import "./css/Account.css";

import { useUser } from "../context/UserProvider.jsx";

// firestore
import { db } from "../firebase-config.js";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";

import { useNavigate } from "react-router-dom";

function Account() {
  const [pronouns, setPronouns] = useState("");
  const [number, setNumber] = useState();
  const [showPronounForm, togglePronounForm] = useState(false);
  const [showNumberForm, toggleNumberForm] = useState(false);

  const { user, userFirebaseData, setUserFirebaseData, logoutGoogle } =
    useUser(); // user from auth
  const userDocRef = doc(db, "users", user?.uid);
  const navigate = useNavigate();

  useEffect(() => {
    // get data fields of current user
    const unsub = onSnapshot(userDocRef, (doc) => {
      setUserFirebaseData(doc.data());
    });
    return () => {
      unsub();
    };
  }, []);

  const updatePronouns = async (e) => {
    e.preventDefault();
    if (!pronouns) {
      alert("Pronouns empty.");
      return;
    }
    togglePronounForm(!showPronounForm);
    const newFields = { pronouns: pronouns };
    await updateDoc(userDocRef, newFields);
  };

  const updateNumber = async (e) => {
    e.preventDefault();
    if (!number) {
      alert("Number empty.");
      return;
    }
    toggleNumberForm(!showNumberForm);
    const newFields = { phoneNumber: number };
    await updateDoc(userDocRef, newFields);
  };

  const cancelPronounForm = () => {
    setPronouns("");
    togglePronounForm(!showPronounForm);
  };

  const cancelNumberForm = () => {
    setNumber("");
    toggleNumberForm(!showNumberForm);
  };

  return (
    <main>
      <NavBar />
      <div
        style={{
          maxWidth: "1100px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
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
                <p>Pronouns: {userFirebaseData.pronouns}</p>
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
                  <form onSubmit={updatePronouns}>
                    <input
                      placeholder="Pronouns"
                      onChange={(event) => {
                        setPronouns(event.target.value);
                      }}
                    />
                    <input type="submit" />
                    <button onClick={cancelPronounForm}>Cancel</button>
                  </form>
                )}
              </div>
              <div>
                <p>Number: {userFirebaseData.phoneNumber}</p>
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
                  <form onSubmit={updateNumber}>
                    <input
                      placeholder="e.g. +11231231234"
                      onChange={(event) => {
                        setNumber(event.target.value);
                      }}
                    />
                    <input type="submit" />
                    <button onClick={cancelNumberForm}>Cancel</button>
                  </form>
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
      <button
        id="logout"
        onClick={() => {
          logoutGoogle();
          navigate("/login");
        }}
      >
        logout
      </button>
    </main>
  );
}

export default Account;
