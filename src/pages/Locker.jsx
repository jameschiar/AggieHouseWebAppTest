import React, { useState } from "react";
import "./css/Locker.css";
import NavBar from "../components/NavBar.jsx";

import { db } from '../firebase-config.js';
import { collection, doc, updateDoc, getDocs, addDoc, onSnapshot, deleteDoc } from 'firebase/firestore';

function Lock() {

    const [randomNum, setRandomNum] = useState(1111);
  
    const handleRandomNum = () => {
      setRandomNum(Math.floor(1000 + Math.random() * 9000));
      console.log('New Locker Code Generated:', setRandomNum);
    };

    const manualNum = event => {
        setRandomNum(event.target.value);
        console.log('New Locker Code Set:', event.target.value);
    }
//below this idk it doesnt work yet
    const uploadCode = {
        //console.log('Code uploaded to Firebase');
    }

    const updateCode = async (id, combination) => {
    const userDoc = doc(db, "codes", Tf36EFl7pRAiJo9YC10j);
    const newFields = { combination: randomNum };
    await updateDoc(userDoc, newFields);
  };

  const createCode = async () => {
    await addDoc(codes, { combination: Number(randomNum) });
  };
  // above this doesnt work yet


  
  
    return (
      <main>
        <NavBar />
        <div>
            Locker Code:
            <input
                type="code"
                id="Lock Code"
                name="Lock Code"
                onChange={manualNum}
                value={randomNum}
            />
            <div>
                <button onClick={handleRandomNum}>Generate New Code</button>
                <button onClick={createCode}>Save New Code</button>
          </div>
        </div>
      </main>
    );
  }
export default Lock;