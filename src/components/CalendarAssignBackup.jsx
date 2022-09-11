import React, { useState } from "react";
import Select from "react-select";
import { useUser } from "../context/UserProvider";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../firebase-config";

function CalendarAssignBackup({ selectedEvent, setSelectedEvent }) {
  const { users, userFirebaseData } = useUser();
  const [newAssignment, setNewAssignment] = useState({}); // store whole user
  const [showAddVolunteer, toggleAddVolunteer] = useState(false);

  const isAdmin = () => {
    return userFirebaseData?.role === "admin";
  };

  const isEmpty = (obj) => {
    return (
      obj &&
      Object.keys(obj).length === 0 &&
      Object.getPrototypeOf(obj) === Object.prototype
    );
  };

  // custom styling for react-select
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: "1px dotted pink",
      color: state.selectProps.menuColor,
      padding: 20,
    }),
    control: (provided, { selectProps: { width, height, fontSize } }) => ({
      ...provided,
      width: width,
      height: height,
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  // submit new assignment to database
  const submitAssignment = async () => {
    if (isEmpty(newAssignment)) {
      alert("No user chosen!");
      return;
    }

    const alreadyExists = () => {
      for (let i = 0; i < selectedEvent.backupVolunteers.length; i++) {
        if (selectedEvent.backupVolunteers[i].id === newAssignment.id) {
          return true;
        }
      }

      return false;
    };

    if (alreadyExists()) {
      alert("User " + newAssignment.displayName + " already exists!");
      return;
    }

    const newbackupVolunteers =
      selectedEvent.backupVolunteers.concat(newAssignment);
    const newFields = {
      ...selectedEvent,
      backupVolunteers: newbackupVolunteers,
    };

    setSelectedEvent((prev) => ({
      ...prev,
      backupVolunteers: newbackupVolunteers,
    }));

    await updateDoc(doc(db, "events", selectedEvent.id), newFields);
  };

  // removes volunteer assignment
  const deleteVolunteer = async (volunteer) => {
    const newbackupVolunteers = selectedEvent.backupVolunteers.filter(
      (object) => {
        return object.id !== volunteer.id;
      }
    );

    const newFields = {
      ...selectedEvent,
      backupVolunteers: newbackupVolunteers,
    };

    await updateDoc(doc(db, "events", selectedEvent.id), newFields);
    setSelectedEvent(newFields);
  };

  const handleSelectChange = (data) => {
    setNewAssignment(data.value);
  };

  return (
    <div className="assigned-backups">
      <div className="justify-align-center">
        <span>Backups: </span>
      </div>

      {selectedEvent.backupVolunteers.map((volunteer, key) => {
        return (
          volunteer.displayName && (
            <div key={key} className="justify-align-center">
              <span>{volunteer.displayName}</span>
              {isAdmin() && (
                <button
                  className="delete-add-button"
                  onClick={() => deleteVolunteer(volunteer)}
                >
                  x
                </button>
              )}
            </div>
          )
        );
      })}
      {showAddVolunteer ? (
        <div className="justify-align-center">
          <div>
            <Select
              styles={customStyles}
              width="200px"
              maxMenuHeight={150}
              options={users.map((user) => {
                return {
                  value: user,
                  label: user.displayName,
                };
              })}
              placeholder="Assign"
              onChange={handleSelectChange}
            />
          </div>
          <button onClick={submitAssignment}>Assign</button>
          <button
            onClick={() => {
              toggleAddVolunteer(false);
              setNewAssignment({});
            }}
          >
            Done
          </button>
        </div>
      ) : (
        <>
          {isAdmin() && (
            <button
              className="delete-add-button"
              onClick={() => toggleAddVolunteer(!showAddVolunteer)}
            >
              +
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default CalendarAssignBackup;
