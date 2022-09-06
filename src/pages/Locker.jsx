import React, { useState, useEffect } from "react";
import "./css/Locker.css";
import NavBar from "../components/NavBar.jsx";

import { db } from "../firebase-config.js";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";

function Lock() {
  const [randomNum, setRandomNum] = useState(1111);

  useEffect(() => {
    getDocs(collection(db, "codes")).then((snapShot) => {
      console.log(snapShot);
    });
  }, []);

  const handleRandomNum = () => {
    setRandomNum(Math.floor(1000 + Math.random() * 9000));
  };

  const setManualNum = (event) => {
    setRandomNum(event.target.value);
    console.log("New Locker Code Set:", event.target.value);
  };

  const updateCode = async () => {
    const code = doc(db, "codes", "Tf36EFl7pRAiJo9YC10j");
    const newFields = { combination: randomNum };
    await updateDoc(code, newFields);
  };

  return (
    <main>
      <NavBar />
      <div>
        Locker Code:
        <input
          type="number"
          id="Lock Code"
          name="Lock Code"
          onChange={setManualNum}
          value={randomNum}
          max="9999"
        />
        <div>
          <button onClick={handleRandomNum}>Generate New Code</button>
          <button onClick={updateCode}>Save New Code</button>
        </div>
      </div>
    </main>
  );
}
export default Lock;
