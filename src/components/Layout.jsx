import React from "react";
import { Outlet } from "react-router-dom";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";

const Layout = () => {
  const logoutGoogle = () => {
    signOut(auth)
      .then(() => {
        console.log("signout success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className="App">
      <Outlet />
      <button onClick={logoutGoogle}>log out</button>
    </main>
  );
};

export default Layout;
