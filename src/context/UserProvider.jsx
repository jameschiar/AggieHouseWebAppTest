// allow the entire app to gain access to user

import React from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { auth, db } from "../firebase-config";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({});

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({}); // user returned by auth
  const [userFirebaseData, setUserFirebaseData] = useState({}); // user fetched in firebase
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // google sign-in function
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // adds user to firestore database in collection "users"
        const addUser = async () => {
          try {
            await setDoc(doc(db, "users", user.uid), {
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              roles: ["user"],
            });
          } catch (e) {
            console.log(e);
          }
        };

        // check if user already exists in database
        const usersRef = doc(db, "users", user.uid);
        getDoc(usersRef).then((docSnapshot) => {
          if (!docSnapshot.exists()) {
            addUser();
            console.log("adding user");
          }
        });
        navigate("/redirecting");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // sign out of google
  const logoutGoogle = () => {
    signOut(auth)
      .then(() => {
        console.log("signout success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const getFirebaseData = (callback) => {
          getDoc(doc(db, "users", currentUser?.uid))
            .then((result) => {
              setUserFirebaseData(result.data());
            })
            .then(() => callback());
        };

        getFirebaseData(() => {
          setLoading(false);
        });
      } else {
        setUserFirebaseData({});
        setUser({});
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    setUser,
    userFirebaseData,
    setUserFirebaseData,
    signInWithGoogle,
    logoutGoogle,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export default UserContext;
