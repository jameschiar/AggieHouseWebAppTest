import React from "react";
import NavBar from "../components/NavBar";
import UserInfo from "../components/UserInfo";
import { useUser } from "../context/UserProvider";

function ManageUsers() {
  const { users } = useUser();

  return (
    <div>
      <NavBar />
      <div style={{ margin: "10px 0px 0px 20px" }}>
        {users.map((user, key) => {
          return <UserInfo user={user} key={key} />;
        })}
      </div>
    </div>
  );
}

export default ManageUsers;
