import React, { useState } from "react";

import { db } from "../firebase-config";
import { deleteDoc, doc, updateDoc } from "@firebase/firestore";

import "./css/UserInfo.css";

// props: user is data from firebase
function UserInfo({ user }) {
  const [edit, toggleEdit] = useState(false);
  const [newNumber, setNewNumber] = useState("");
  const [newRole, setNewRole] = useState("user");
  const [numberSubmittedMsg, setNumberSubmittedMsg] = useState("");
  const [roleSubmittedMsg, setRoleSubmittedMsg] = useState("");

  const submitNumber = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "users", user.id), { phoneNumber: newNumber });
    setNumberSubmittedMsg("Number submitted!");
  };

  const submitRole = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "users", user.id), { role: newRole });
    setRoleSubmittedMsg("Role submitted!");
  };

  const deleteUser = async () => {
    await deleteDoc(doc(db, "users", user.id));
  };

  const confirmDelete = () => {
    if (
      confirm("Are you sure you want to delete user " + user.displayName + "?")
    ) {
      deleteUser();
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={user.photoURL}
        className="pfp"
        height="96px"
        width="96px"
        referrerPolicy="no-referrer"
      />
      <div className="user-card" style={{ marginLeft: "10px" }}>
        <p>
          Name: {user.displayName} {user.pronouns && "("}
          {user.pronouns}
          {user.pronouns && ")"}
        </p>
        <p>Email: {user.email}</p>
        <p>Number: {user.phoneNumber}</p>
        <p>Role: {user.role}</p>
      </div>
      {!edit && (
        <button className="edit-button" onClick={() => toggleEdit(!edit)}>
          Edit
        </button>
      )}
      {edit && (
        <div>
          <div>
            <form onSubmit={submitNumber}>
              <label htmlFor="phone-number">Number: </label>
              <input
                id="phone-number"
                type="text"
                autoComplete="off"
                onChange={(e) => {
                  setNewNumber(e.target.value);
                }}
              />
              <input type="submit" />
              {numberSubmittedMsg && <span> {numberSubmittedMsg}</span>}
            </form>
          </div>
          <div>
            <form onSubmit={submitRole} id="role-form">
              <label htmlFor="role">Select Role: </label>
              <select
                form="role-form"
                name="role"
                id="role"
                onChange={(e) => {
                  setNewRole(e.target.value);
                }}
              >
                <option value="user">user (can't access site)</option>
                <option value="volunteer">volunteer</option>
                <option value="admin">admin</option>
              </select>
              <input type="submit" />
              {roleSubmittedMsg && <span> {roleSubmittedMsg}</span>}
            </form>
          </div>
          <br />
          <button
            onClick={() => {
              toggleEdit(!edit);
            }}
          >
            Close
          </button>
          <button style={{ color: "#FF0000" }} onClick={confirmDelete}>
            Delete User
          </button>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
