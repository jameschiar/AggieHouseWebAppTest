import React from "react";
import NavBar from "../components/NavBar.jsx";

// import 'react-big-calendar/lib/css/react-big-calendar.css';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./css/Todo.css";
import MealsCalendar from "../components/MealsCalendar.jsx";
import Chores from "../components/Chores.jsx";

function Todo() {
  return (
    <div>
      <NavBar />
      <MealsCalendar />
      <Chores />
    </div>
  );
}

export default Todo;
