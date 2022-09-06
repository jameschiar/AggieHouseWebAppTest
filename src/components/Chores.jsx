import React, { useState, useCallback, useEffect, useRef } from "react";
import ChoreTable from "./ChoreTable.jsx";

import { db } from "../firebase-config.js";
import { collection, onSnapshot } from "firebase/firestore";
// import 'react-big-calendar/lib/css/react-big-calendar.css';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

function Chores() {
  const [isBusy, setBusy] = useState(true);
  const [showChoreForm, setShowChoreForm] = useState(false);
  const [statusData, setStatusData] = useState([]);
  const [newChore, setNewChore] = useState("");
  const [deleteState, toggleDeleteState] = useState(false);

  const choresCollectionRef = collection(db, "chores");

  useEffect(() => {
    // get all chore data from database
    let unsub;
    const getChoreData = async () => {
      // onSnapshot listens to firebase for changes
      unsub = onSnapshot(choresCollectionRef, (collection) => {
        setStatusData(
          collection.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    };
    getChoreData();
    setBusy(false);

    // useEffect cleanup function
    return () => {
      unsub(); // disable onSnapshot
      setBusy(true);
    };
  }, []);

  // add resident to table
  // const addChore = async (e) => {
  //   e.preventDefault(); // prevent page refresh

  //   // error check for empty first or last name
  //   if (newChore.length == 0) {
  //     alert("Must include chore");
  //     return;
  //   }

  //   // set up fields to add to attendance collection
  //   const fields = {
  //     chore: newChore,
  //     status: "yes",
  //   };

  //   await addDoc(collection(db, "chores"), fields);

  //   // reset values and close form
  //   setNewChore("");
  //   setShowChoreForm(false);
  // };

  const cancelForm = () => {
    setShowChoreForm(false);
    setNewChore("");
  };

  return (
    <div>
      <div>
        <h1 className="chores-header"> Chores </h1>
      </div>
      {!isBusy && (
        <div>
          <ChoreTable choreData={statusData} />
        </div>
      )}
    </div>
  );
}

export default Chores;
