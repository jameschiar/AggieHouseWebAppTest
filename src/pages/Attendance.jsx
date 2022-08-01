import React from 'react';
import NavBar from "../components/NavBar.jsx"
import "./css/Attendance.css"
import data from '../data/attendance'

function Attendance() {
  return (
    <main>
      
      <NavBar/>

      <div className="attendance-sheet">
        <table>
          <tr>
            <th>Resident Name</th>
            <th>Present</th>
            <th>Excused Absence</th>
            <th>Unexcused Absence</th>
            <th>Notes</th>
          </tr>
          {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.present}</td>
              <td>{val.excused}</td>
              <td>{val.unexcused}</td>
              <td>{val.notes}</td>
            </tr>
          )
        })}
        </table>
        </div>
      
      {/*old stuff without table implementation, keeping just in case for now - Darren
      
      <div id="attendance-sheet-old">
        <div id="column-header">
          <h1 className="column-header-text">Resident Name</h1>
          <h2 className="column-header-text">Present</h2>
          <h3 className="column-header-text">Excused Absence</h3>
          <h4 className="column-header-text">Unexcused Absence</h4>
          <h5 className="column-header-text">Notes</h5>
        </div>
        <div id="columns">
          <h1 className="column-text"></h1>
        </div>
          
      </div>
      */}
      
    </main>
  );
}

export default Attendance;