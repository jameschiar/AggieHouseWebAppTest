import React, { useState, useCallback, useEffect, useRef } from "react";
import NavBar from "../components/NavBar.jsx";

import { useUser } from "../context/UserProvider";

import { db } from "../firebase-config.js";
import {
  collection,
  doc,
  updateDoc,
  getDocs,
  addDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";

import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./css/Calendar.css";

const localizer = momentLocalizer(moment);
const DragandDropCalendar = withDragAndDrop(Calendar);

function showCalendar() {
  const [modalState, setModalState] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(undefined);
  const [myEvents, setEvents] = useState([]);
  const eventsCollectionRef = collection(db, "events");
  const bottomRef = useRef(null);

  const { userFirebaseData } = useUser();

  const isAdmin = () => {
    return userFirebaseData?.role === "admin"
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [modalState]);

  useEffect(() => {
    const getEvents = async () => {
      onSnapshot(eventsCollectionRef, (collection) => {
        setEvents(
          collection.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            start: doc.data().start.toDate(),
            end: doc.data().end.toDate(),
          }))
        );
      });
    };
    getEvents();
  }, []);

  const shiftSelection = (events) => {
    setSelectedEvent(events);
    setModalState(true);
  };

  const Modal = () => {
    return (
      <div className={`modal-${modalState == true ? "show" : "hide"}`}>
        <div className="modalTitle">{selectedEvent.title}</div>
        <div className="modalBody">
          Start Time: {moment(selectedEvent.start).format("hh:mm a")} on
          {moment(selectedEvent.start).format("MMMM d, YYYY")} <br />
          End Time: {moment(selectedEvent.end).format("hh:mm a")} on 
          {moment(selectedEvent.end).format("MMMM d, YYYY")} <br />
        </div>
        <br />
        <div className="modalFooter">
          <button
            className="closeModal"
            onClick={() => {
              setModalState(false);
            }}
          >
            Cancel
          </button>
          <button
            className="modalDelete"
            onClick={() => {
              deleteEvent(selectedEvent.id);
              setModalState(false);
            }}
          >
            Delete
          </button>
        </div>
        <div ref={bottomRef} />
      </div>
    );
  };

  const deleteEvent = async (id) => {
    if (isAdmin()) {
      const eventDoc = doc(db, "events", id);
      await deleteDoc(eventDoc);
    }
  };
  
  const slotSelection = useCallback(
    ({ start, end }) => {
      if (isAdmin()) {
        const title = window.prompt("New Event Name:");
        if (title) {
          const addEvent = async () => {
            await addDoc(eventsCollectionRef, {
              title: title,
              start: start,
              end: end,
            });
          };
          addEvent();
        } else {
          //display error
        }
      }
    },
    [setEvents]
  );

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      if (isAdmin()) {
        const { allDay } = event;
        if (!allDay && droppedOnAllDaySlot) {
          event.allday = true;
        }
        console.log(start, end);

        const updateEvent = async () => {
          await updateDoc(doc(db, "events", event.id), {
            start: start,
            end: end,
          });
        };
        updateEvent();
      }
    },
    [setEvents]
  );

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      if (isAdmin()) {
        const updateEvent = async () => {
          await updateDoc(doc(db, "events", event.id), {
            start: start,
            end: end,
          });
        };
        updateEvent();
      }
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
          onSelectEvent={(e) => shiftSelection(e)}
          onSelectSlot={slotSelection}
          selectable
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          popup
          resizable
        />
        {selectedEvent && <Modal />}
      </div>
    </div>
  );
}

export default showCalendar;
