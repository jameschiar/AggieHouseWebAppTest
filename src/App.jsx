import React from "react";
import "./App.css";

// import pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ShowCalendar from "./pages/Calendar";
import Attendance from "./pages/Attendance";
import Todo from "./pages/Todo";
import Account from "./pages/Account";
import Layout from "./components/Layout";
import Missing from "./pages/Missing";
import Unauthorized from "./pages/Unauthorized";
import Resources from "./pages/Resources";
import RequireAuth from "./components/RequireAuth";
import Redirecting from "./pages/Redirecting";

import { Routes, Route } from "react-router-dom";
import { useUser } from "./context/UserProvider";

function App() {
  const { userFirebaseData } = useUser();
  console.log(userFirebaseData);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/Redirecting" element={<Redirecting />}></Route>
        <Route path="/unauthorized" element={<Unauthorized />}></Route>
        {/* private routes */}
        <Route element={<RequireAuth allowedRoles={["admin", "volunteer"]} />}>
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
