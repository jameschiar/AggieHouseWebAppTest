import React, { useState, useEffect } from "react";

import { db } from "../firebase-config";
import { collection, onSnapshot } from "@firebase/firestore";

const DashAlerts = () => {
  const [alertData, setAlertData] = useState([]);

  const AlertsCollectionRef = collection(db, "alerts");

  useEffect(() => {
    let unsub;
    const getAlerts = async () => {
      // onSnapshot listens to firebase for changes
      unsub = onSnapshot(AlertsCollectionRef, (collection) => {
        setAlertData(
          collection.docs.map((doc) => ({
            id: doc.id,
            message: doc.data().message,
          }))
        );
      });
    };
    getAlerts();
  }, []);

  return (
    <div>
      {alertData?.map((alert, key) => {
        return (
          <div key={key}>
            <p>{alert.message}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DashAlerts;
