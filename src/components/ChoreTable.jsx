import React from "react";

// firestore
import { doc, updateDoc, deleteDoc } from "@firebase/firestore";
import { db } from "../firebase-config";

//components
// import { AttendanceNotesForm } from "./AttendanceNotesForm";
import ChoreStatusButton from "./ChoreStatusButton";

const ChoreTable = ({ choreData, deleteState }) => {

  return (
    <div className="chore-sheet">
      <table>
        <tbody>
          <tr>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
          </tr>

          {choreData?.map((val, key) => {
            return (
                <td key={key}>
                  {val.chore}
                </td>
            );
          })}
          <tr>
          {choreData?.map((val, key) => {
            return (
                <td>
                  <ChoreStatusButton
                    chore={val}
                    status={val.status}
                  />
                </td>
            );
          })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ChoreTable;
