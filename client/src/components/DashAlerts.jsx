import React, { useState, useEffect } from "react";

import { db } from "../firebase-config";
import { collection, deleteDoc, doc, updateDoc, addDoc, onSnapshot } from "@firebase/firestore";

const DashAlerts = () => {
  const [alertData, setAlertData] = useState([]);

  const AlertsCollectionRef = collection(db, "alerts");

  useEffect(() => {

    let unsub;
    const getAlerts = async () => {
      // onSnapshot listens to firebase for changes
      unsub = onSnapshot(AlertsCollectionRef, (collection) => {
        setAlertData(
          collection.docs.map((doc) => ({ id: doc.id, message: doc.data().message }))
        );
      });
    };
    getAlerts();
  }, []);

  
  return (
    <div>
      
      <div>
        
      {alertData?.map((alert)=> {
        return (
        <div>
          <p>{alert.message}</p>
        </div>
            );
        })}
        
            
      </div>
    </div>
  );
};

export default DashAlerts;