import React from "react";
import { doc, updateDoc, deleteDoc } from "@firebase/firestore";
import { db } from "../firebase-config";
import { NotesForm } from "./NotesForm";

const AttendanceTable = ({ attendanceData, deleteState }) => {
  // clicking in the boxes will display "X" or nothing
  const updateButton = async (resident, PorEAorUA) => {
    const residentDocRef = doc(db, "attendance", resident.id);
    var newFields;
    switch (PorEAorUA) {
      case "present":
        newFields = { present: !resident.present };
        break;
      case "EA":
        newFields = { excusedAbsence: !resident.excusedAbsence };
        break;
      case "UA":
        newFields = { unexcusedAbsence: !resident.unexcusedAbsence };
        break;
      default:
        throw "Not a valid option";
    }
    await updateDoc(residentDocRef, newFields);
  };

  const deleteResident = async (resident) => {
    await deleteDoc(doc(db, "attendance", resident.id));
  };

  return (
    <div className="attendance-sheet">
      <table>
        <tr>
          <th>Resident Name</th>
          <th>Present</th>
          <th>Excused Absence</th>
          <th>Unexcused Absence</th>
          <th>Notes</th>
        </tr>

        {attendanceData?.map((val, key) => {
          return (
            <tr key={key}>
              <td>
                {val.givenName} {val.familyName}
              </td>
              <td>
                <button
                  className="table-button"
                  onClick={() => {
                    updateButton(val, "present");
                  }}
                >
                  {!val.present && "X"}
                </button>
              </td>
              <td>
                <button
                  className="table-button"
                  onClick={() => {
                    updateButton(val, "EA");
                  }}
                >
                  {val.excusedAbsence && "X"}
                </button>
              </td>
              <td>
                <button
                  className="table-button"
                  onClick={() => {
                    updateButton(val, "UA");
                  }}
                >
                  {val.unexcusedAbsence && "X"}
                </button>
              </td>
              <td>
                <NotesForm val={val} />
              </td>
              {deleteState && (
                <button
                  onClick={() => {
                    deleteResident(val);
                  }}
                >
                  Delete Resident
                </button>
              )}
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default AttendanceTable;
