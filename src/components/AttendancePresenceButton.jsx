import React from "react";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../firebase-config";

const AttendancePresenceButton = ({ resident, presence }) => {
  // clicking in the boxes will display "X" or nothing
  const updateButton = async () => {
    const residentDocRef = doc(db, "attendance", resident.id);
    const newFields = { presence: presence };
    await updateDoc(residentDocRef, newFields);
  };

  return (
    <button
      className="table-button"
      onClick={() => {
        updateButton();
      }}
    >
      {resident.presence === presence && "X"}
    </button>
  );
};

export default AttendancePresenceButton;
