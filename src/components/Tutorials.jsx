import React, { useState, useEffect } from "react";

import { db } from "../firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
  onSnapshot,
} from "@firebase/firestore";
import { useUser } from "../context/UserProvider";

import "../pages/css/Resources.css";

const Tutorials = ({ deleteState }) => {
  // const [edit, toggleEdit] = useState(false);
  const { users, userFirebaseData } = useUser();
  const [tutorialData, setTutorialData] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newLink, setNewLink] = useState("");
  const [newTutorialForm, setNewTutorialForm] = useState(false);
  // const [questionSubmittedMsg, setQuestonSubmittedMsg] = useState("");
  // const [answerSubmittedMsg, setAnswerSubmittedMsg] = useState("");

  const tutorialsCollectionRef = collection(db, "tutorials");

  const isAdmin = () => {
    return userFirebaseData?.role === "admin";
  };

  useEffect(() => {
    let unsub;
    const getTutorials = async () => {
      // onSnapshot listens to firebase for changes
      unsub = onSnapshot(tutorialsCollectionRef, (collection) => {
        setTutorialData(
          collection.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            url: doc.data().url,
          }))
        );
      });
    };
    getTutorials();
  }, []);

  const addTutorial = async (e) => {
    e.preventDefault();

    const fields = {
      title: newTitle,
      url: newLink,
    };

    await addDoc(collection(db, "tutorials"), fields);

    setNewTitle("");
    setNewLink("");
    setNewTutorialForm(false);
  };

  // const submitQuestion = async (e) => {
  //   e.preventDefault();
  //   await updateDoc(doc(db, "faqs", faqs.id), { Question: newQuestion });
  //   setQuestionSubmittedMsg("Question submitted!");
  // };

  // const submitAnswer = async (e) => {
  //   e.preventDefault();
  //   await updateDoc(doc(db, "faqs", faqs.id), { Answer: newAnswer });
  //   setQuestionSubmittedMsg("Question submitted!");
  // };

  const deleteTutorial = async (tutorials) => {
    await deleteDoc(doc(db, "tutorials", tutorials.id));
  };

  // const confirmDelete = () => {
  //   }
  // };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div className="body">
        {tutorialData?.map((tutorial) => {
          return (
            <div style={{ marginTop: "10px" }}>
                <ul>
                  <li className='list'><u><a className='link' href={tutorial.url} target='_blank'>{tutorial.title}</a></u>
                {deleteState && (
                  <button
                    className="deleteButton"
                    onClick={() => {
                      if (
                        confirm(
                          "Are you sure you want to delete this Tutorial?"
                        )
                      )
                        deleteTutorial(tutorial);
                    }}
                  >
                    Delete
                  </button>
                )}</li>
              </ul>
            </div>
          );
        })}
        {isAdmin() && !newTutorialForm && (
          <button
            className="addButton"
            onClick={() => {
              setNewTutorialForm(true);
            }}
          >
            Add Tutorial
          </button>
        )}
        {isAdmin() && newTutorialForm && (
          <form onSubmit={addTutorial}>
            <input
              autoFocus
              className="inputText"
              type="text"
              placeholder="Title"
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
            />
            <input
              type="text"
              className="inputText"
              placeholder="Link"
              onChange={(e) => {
                setNewLink(e.target.value);
              }}
            />
            <div style={{ display: "flex" }}>
              <input className="submitButton" type="submit" />
              <button
                className="submitButton"
                onClick={() => {
                  setNewTutorialForm(false);
                  setNewTitle("");
                  setNewLink("");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Tutorials;
