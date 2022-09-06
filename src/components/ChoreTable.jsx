import React from "react";

// components
import ChoreStatusButton from "./ChoreStatusButton";

const ChoreTable = ({ choreData }) => {
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
          <tr>
            {choreData?.map((val, key) => {
              return <td key={key}>{val.chore}</td>;
            })}
          </tr>
          <tr>
            {choreData?.map((val, key) => {
              return (
                <td key={key}>
                  <ChoreStatusButton chore={val} />
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
