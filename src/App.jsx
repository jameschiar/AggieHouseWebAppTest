import React from 'react';
import { useState, useEffect } from 'react'
import './App.css';

// firebase google login stuff
import { auth } from './firebase-config.js'
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

// firestore database
import { db } from './firebase-config.js'
import { collection, getDocs, setDoc, addDoc, doc } from 'firebase/firestore'

// import contexts
import { userContext } from './context/userContext'

// import pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ShowCalendar from './pages/Calendar';
import Attendance from './pages/Attendance';
import Todo from './pages/Todo';
import Account from './pages/Account';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState({});  // current user from auth
  const [users, setUsers] = useState([]);  // all users from database
  const usersCollectionRef = collection(db, "users");  // grab users collection

  useEffect(() => {
    // make sure user stays logged in on page refresh
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    })

    // get all users from database
    const getUsers = async () => {
      const usersData = await getDocs(usersCollectionRef);
      setUsers(usersData.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }
    getUsers();
    
  }, []);
  
  const provider = new GoogleAuthProvider();

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
              phoneNumber: null,
              photoURL: user.photoURL,
              pronouns: null
            });
          }
          catch (e) { console.log(e); }
        }
        addUser();
        
      }).catch((error) => {
        console.log(error);
      });
  }

  const logoutGoogle = () => {
    signOut(auth).then(() => {
      console.log("signout success");
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <userContext.Provider value={user}>
      <BrowserRouter>
        {!user && <button onClick={signInWithGoogle}>
          click me
      </button>}
        <Routes>
          {/* if user is already logged in, go to dashboard */}
          <Route exact path="/" element={!user ? <Navigate to="/login" /> : <Dashboard />}>
          </Route>
          <Route exact path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />}>
          </Route>
          <Route exact path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />}>
          </Route>
          <Route exact path="/calendar" element={<ShowCalendar />}>
          </Route>
          <Route exact path="/attendance" element={<Attendance />}>
          </Route>
          <Route exact path="/todo" element={<Todo />}>
          </Route>
          <Route exact path="/account" element={<Account />}>
          </Route>
        </Routes>

        {user && <button onClick={logoutGoogle}>log out</button>}
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;