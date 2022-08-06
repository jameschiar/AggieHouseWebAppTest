import React, { useState, useCallback } from "react";
import NavBar from "../components/NavBar.jsx";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./css/Calendar.css";

import events from "../data/events";

const localizer = momentLocalizer(moment);
const DragandDropCalendar = withDragAndDrop(Calendar);

function showCalendar() {
  const [myEvents, setEvents] = useState(events);

  const slotSelection = useCallback(
    ({ start, end }) => {
      const title = window.prompt("New Event Name:");
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }]);
      }
    },
    [setEvents]
  );

  const shiftSelection = useCallback(
    (events) =>
      alert(
        events.title +
          "'s shift \nBegins at: " +
          events.start +
          "\nEnds at: " +
          events.end
      ),
    []
  );

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allday = true;
      }

      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id);
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end, allDay }];
      });
    },
    [setEvents]
  );

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id);
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setEvents]
  );

  console.log(myEvents);

  return (
    <div>
      <NavBar />
      <h1 className="calendar-header"> Calendar </h1>
      <div className="calendar-container">
        <DragandDropCalendar
          style={{ backgroundColor: "#FAF9F9" }}
          localizer={localizer}
          defaultView={Views.WEEK}
          events={myEvents}
          defaultDate={moment().toDate()}
          onSelectEvent={shiftSelection}
          onSelectSlot={slotSelection}
          selectable
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          resizable
        />
      </div>
    </div>
  );
}

export default showCalendar;

//temporary, should be a hover probably
/* i think if we're in month view, clicking an event should take us
              to the week view of that event - james */
