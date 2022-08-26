import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

// firebase google login stuff
import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "firebase/auth";

// firestore database
import { db } from "./firebase-config.js";
import { collection } from "firebase/firestore";

// import contexts
import UserContext from "./context/UserProvider";

// import pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ShowCalendar from "./pages/Calendar";
import Attendance from "./pages/Attendance";
import Todo from "./pages/Todo";
import Account from "./pages/Account";
import Layout from "./components/Layout";
import Missing from "./pages/Missing";
import Resources from './pages/Resources';
import RequireAuth from "./components/RequireAuth";

import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

function App() {
  const { user, setUser } = useContext(UserContext); // current user from auth
  const [users, setUsers] = useState([]); // all users from database
  const usersCollectionRef = collection(db, "users"); // grab users collection

  useEffect(() => {
    // make sure user stays logged in on page refresh
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // // get all users from database
    // const getUsers = async () => {
    //   const usersData = await getDocs(usersCollectionRef);
    //   setUsers(usersData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // };
    // getUsers();
  }, []);

  console.log(user);

  return (
    <Routes>
      {/* if user is already logged in, go to dashboard */}
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/login" element={<Login />}></Route>

        {/* private routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/calendar" element={<ShowCalendar />}></Route>
          <Route path="/attendance" element={<Attendance />}></Route>
          <Route path="/todo" element={<Todo />}></Route>
          <Route path="/resources" element={<Resources />}></Route>
          <Route path="/account" element={<Account />}></Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
