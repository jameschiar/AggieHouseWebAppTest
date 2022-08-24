import React from "react";
import "./css/Dashboard.css";
import NavBar from "../components/NavBar.jsx";
import { Link } from "react-router-dom";
import events from "../data/events";
import moment from "moment";
import { useUser } from "../context/UserProvider.jsx";

function Dashboard() {
  const { user } = useUser();

  const DATE_OPTIONS = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  var now = moment();

  //we should link shifts to emails and can make this return the next shift linked to that email
  const upcomingShift = events.find((obj) => {
    if (obj.start.getTime() > now) {
      return obj;
    }
    //return obj.id === 4; }
  });
  // console.log(upcomingShift)

  return (
    <main>
      <NavBar />

      <div id="dash">
        <h2 className="greeting">Hello {user.displayName}</h2>
        <h3 className="modules">
          Upcoming Shift
          {upcomingShift && (
            <p className="info">
              {upcomingShift.start.toLocaleDateString("en-US", DATE_OPTIONS)}
            </p>
          )}
        </h3>
        <h4 className="modules">
          Alerts
          <p className="info">alerts imported here</p>
        </h4>
        <h4 className="modules">
          Available Shifts
          <p className="info">List of Available shifts</p>
        </h4>
        <hr />
      </div>
    </main>
  );
}

export default Dashboard;
