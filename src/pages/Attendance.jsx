import React from "react";
import NavBar from "../components/NavBar.jsx";
import "./css/Attendance.css";
import { useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { db } from "../firebase-config";
import { useEffect } from "react";
import AttendanceTable from "../components/AttendanceTable.jsx";

let today = new Date().toLocaleDateString();

function Attendance() {
  const [isBusy, setBusy] = useState(true);
  const [showResidentForm, setShowResidentForm] = useState(false);
  const [deleteState, toggleDeleteState] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [residentGivenName, setResidentGivenName] = useState("");
  const [residentFamilyName, setResidentFamilyName] = useState("");
  const [date, setDate] = useState("");
  const [newDate, setNewDate] = useState("");

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
    setDate(new Date().toLocaleDateString());
    setNewDate(new Date().toLocaleDateString());
    getAttendanceData();
    setBusy(false);

    // useEffect cleanup function
    return () => {
      unsub(); // disable onSnapshot
      setBusy(true);
    };
  }, []);

  // helper function: returns current date in format yyyy-MM-dd
  const currentDate = () => {
    var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = new Date(Date.now() - tzoffset)
      .toISOString()
      .slice(0, -1)
      .split("T")[0];
    return localISOTime;
  };

  // submit attendance data of currently selected date
  // checks if there's already a submission for current date, then deletes it
  // adds new submission with current date
  const submitAttendanceData = async () => {
    const q = query(
      collection(db, "attendanceArchive"),
      where("date", "==", date)
    );

    const querySnapshot = await getDocs(q);

    //instead of deleting should just updateDoc
    if (!querySnapshot.empty) {
      querySnapshot.forEach((document) => {
        updateDoc(doc(db, "attendanceArchive", document.id), {
          residents: attendanceData,
          date: date,
        }).then(() => {
          console.log("attendance data updated");
        });
      });
    }
  };

  // add resident to table
  const addResident = async (e) => {
    e.preventDefault(); // prevent page refresh on form submit

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
      presence: "",
    };

    await addDoc(collection(db, "attendance"), fields);

    // reset values and close form
    setResidentFamilyName("");
    setResidentGivenName("");
    setShowResidentForm(false);
  };

  // change the attendance table to chosen date
  const changeDate = async (e) => {
    e.preventDefault();
    let submittedDate = new Date(
      newDate.replace(/-/g, "/")
    ).toLocaleDateString();
    setDate(submittedDate);

    // query the database for submittedDate
    if (submittedDate != date) {
      const q = query(
        collection(db, "attendanceArchive"),
        where("date", "==", submittedDate)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((document) => {
          setAttendanceData(document.data().residents);
        });
      } else {
        setAttendanceData([]);
      }
    }
  };

  return (
    <div>
      <NavBar />
      {!isBusy && (
        <>
          <form onSubmit={changeDate}>
            <label htmlFor="date-picker">View past attendance: </label>
            <input
              id="date-picker"
              type="date"
              defaultValue={currentDate()}
              onChange={(e) => setNewDate(e.target.value)}
              min="2022-01-01"
              max="2100-01-01"
            />
            <input type="submit" />
          </form>
          <div>
            <h2 style={{ marginLeft: "30px", color: "#545454" }}>{date}</h2>
            <AttendanceTable
              attendanceData={attendanceData}
              deleteState={deleteState}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginRight: "30px",
            }}
          >
            <button onClick={submitAttendanceData} id="submit-button">
              Submit
            </button>
          </div>
        </>
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
              <button
                onClick={() => {
                  setShowResidentForm(false);
                  setResidentFamilyName("");
                  setResidentGivenName("");
                }}
              >
                Cancel
              </button>
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
    </div>
  );
}

export default Attendance;
