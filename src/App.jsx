import React from 'react';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ShowCalendar from './pages/Calendar';
import Attendance from './pages/Attendance';
import Todo from './pages/Todo';

import {BrowserRouter, Routes, Route} from "react-router-dom";


function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login />}>
      </Route>
      <Route exact path="/dashboard" element={<Dashboard />}>
      </Route>
      <Route exact path="/calendar" element={<ShowCalendar />}>
      </Route>
      <Route exact path="/attendance" element={<Attendance />}>
      </Route>
      <Route exact path="/todo" element={<Todo />}>
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;