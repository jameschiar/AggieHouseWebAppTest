import React, { useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../firebase-config";

function AttendanceResidentForm() {
  const [showResidentForm, setShowResidentForm] = useState(false);
  const [residentGivenName, setResidentGivenName] = useState("");
  const [residentFamilyName, setResidentFamilyName] = useState("");

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

  return (
    <>
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
    </>
  );
}

export default AttendanceResidentForm;
