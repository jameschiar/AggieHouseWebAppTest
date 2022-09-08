import React, { useState, useEffect } from "react";

import { db } from "../firebase-config";
import { collection, deleteDoc, doc, updateDoc, addDoc, onSnapshot } from "@firebase/firestore";

const FAQInfo = ({ deleteState }) => {
  // const [edit, toggleEdit] = useState(false);
  const [faqData, setFAQData] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newFAQForm, setNewFAQForm] = useState(false);
  // const [questionSubmittedMsg, setQuestonSubmittedMsg] = useState("");
  // const [answerSubmittedMsg, setAnswerSubmittedMsg] = useState("");

  const FAQsCollectionRef = collection(db, "faqs");

  useEffect(() => {

    let unsub;
    const getFAQs = async () => {
      // onSnapshot listens to firebase for changes
      unsub = onSnapshot(FAQsCollectionRef, (collection) => {
        setFAQData(
          collection.docs.map((doc) => ({ id: doc.id, Question: doc.data().Question, Answer: doc.data().Answer }))
        );
      });
    };
    getFAQs();
  }, []);


  const addFAQ = async (e)  => {
    e.preventDefault();

    const fields = {
      Question: newQuestion,
      Answer: newAnswer
    };

    await addDoc(collection(db, "faqs"), fields);

    setNewQuestion("");
    setNewAnswer("");
    setNewFAQForm(false);
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

  const deleteFAQ = async (faqs) => {
    await deleteDoc(doc(db, "faqs", faqs.id));
  };

  // const confirmDelete = () => {
  //   }
  // };
  
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      
      <div>
        
      {faqData?.map((faq)=> {
        return (
        <div style={{ marginTop: "10px" }}>
          <p><b>Q: {faq.Question}</b></p>
          <p><b>A:</b> {faq.Answer} {deleteState && (
          <button
            style ={{ marginBottom: "10px" }}
            onClick={() => {
              if (confirm("Are you sure you want to delete entry " + faq.Question + "?"))
                deleteFAQ(faq);
            }}> 
            Delete
          </button>
          )}
          </p>  
          
        </div>
            );
        })}
        {!newFAQForm && (
            <button
              style = {{ marginTop: "7.5px" }}
              onClick={() => {
                setNewFAQForm(true);
              }}
            >
              Add FAQ
            </button>
          )}
      {newFAQForm && (
        <form onSubmit={addFAQ}>
          <input
            autoFocus
            type="text"
            placeholder="Question"
            onChange={(e) => {
              setNewQuestion(e.target.value);
            }}
          />
          <input
            type = "text"
            placeholder = "Answer"
            onChange={(e) => {
              setNewAnswer(e.target.value);
            }}
            />
          <div style={{display: "flex"}}>
            <input type = "submit" />
            <button
              onClick={() => {
                setNewFAQForm(false);
                setNewQuestion("");
                setNewAnswer("");
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

export default FAQInfo;