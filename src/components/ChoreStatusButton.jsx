import React from "react";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../firebase-config";

const ChoreStatusButton = ({ chore, status }) => {
  // clicking in the boxes will display "X" or nothing
  const updateButton = async () => {
    const choreDocRef = doc(db, "chores", chore.id);
    const newFields = { status: status };
    await updateDoc(choreDocRef, newFields);
  };

  return (
    <button
      className="table-button"
      onClick={() => {
        updateButton();
      }}
    >
      {chore.status === status && "X"}
    </button>
  );
};

export default ChoreStatusButton;