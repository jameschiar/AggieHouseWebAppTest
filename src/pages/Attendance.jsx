import React from "react";
import NavBar from "../components/NavBar.jsx";
import "./css/Attendance.css";
import { useState } from "react";
import { addDoc, collection, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase-config";
import { useEffect } from "react";
import Loading from "./Loading.jsx";
import AttendanceTable from "../components/AttendanceTable.jsx";

function Attendance() {
  const [isBusy, setBusy] = useState(true);
  const [showResidentForm, setShowResidentForm] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [residentGivenName, setResidentGivenName] = useState("");
  const [residentFamilyName, setResidentFamilyName] = useState("");
  const [deleteState, toggleDeleteState] = useState(false);

  const attendanceCollectionRef = collection(db, "attendance");

  useEffect(() => {
    // get all attendance data from database
    let unsub;
    const getAttendanceData = async () => {
      // onSnapshot listens to firebase for changes
      unsub = onSnapshot(attendanceCollectionRef, (collection) => {
        setAttendanceData(
          collection.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    };
    getAttendanceData();
    setBusy(false);

    // useEffect cleanup function
    return () => {
      unsub(); // disable onSnapshot
      setBusy(true);
    };
  }, []);

  // add resident to table
  const addResident = async (e) => {
    e.preventDefault(); // prevent page refresh

    // error check for empty first or last name
    if (residentFamilyName.length == 0 || residentGivenName.length == 0) {
      alert("Must include first and last name");
      return;
    }

    // set up fields to add to attendance collection
    const fields = {
      familyName: residentFamilyName,
      givenName: residentGivenName,
      notes: "",
      presence: "present",
    };

    await addDoc(collection(db, "attendance"), fields);

    // reset values and close form
    setResidentFamilyName("");
    setResidentGivenName("");
    setShowResidentForm(false);
  };

  const cancelForm = () => {
    setShowResidentForm(false);
    setResidentFamilyName("");
    setResidentGivenName("");
  };

  return (
    <div>
      <NavBar />
      {!isBusy && (
        <div>
          <AttendanceTable
            attendanceData={attendanceData}
            deleteState={deleteState}
          />
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", width: "130px" }}>
        {!showResidentForm && (
          <button
            onClick={() => {
              setShowResidentForm(true);
            }}
          >
            Add Resident
          </button>
        )}
        {showResidentForm && (
          <form onSubmit={addResident}>
            <input
              autoFocus
              type="text"
              placeholder="First Name"
              onChange={(e) => {
                setResidentGivenName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => {
                setResidentFamilyName(e.target.value);
              }}
            />
            <div style={{ display: "flex" }}>
              <input type="submit" />
              <button onClick={cancelForm}>Cancel</button>
            </div>
          </form>
        )}
        <button
          style={{ marginTop: "10px" }}
          onClick={() => {
            toggleDeleteState(!deleteState);
          }}
        >
          Delete Residents
        </button>
      </div>

      {/*old stuff without table implementation, keeping just in case for now - Darren
      
      <div id="attendance-sheet-old">
        <div id="column-header">
          <h1 className="column-header-text">Resident Name</h1>
          <h2 className="column-header-text">Present</h2>
          <h3 className="column-header-text">Excused Absence</h3>
          <h4 className="column-header-text">Unexcused Absence</h4>
          <h5 className="column-header-text">Notes</h5>
        </div>
        <div id="columns">
          <h1 className="column-text"></h1>
        </div>
          
      </div>
      */}
    </div>
  );
}

export default Attendance;
