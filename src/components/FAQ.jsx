import React, { useState } from "react";

import { db } from "../firebase-config";
import { deleteDoc, doc, updateDoc } from "@firebase/firestore";

function FAQInfo({ faq }) {
  const [edit, toggleEdit] = useState(false);
  const [newQuestion, setNewQuestion] = useState("Question");
  const [newAnswer, setNewAnswer] = useState("Answer");
  const [questionSubmittedMsg, setQuestonSubmittedMsg] = useState("");
  const [answerSubmittedMsg, setAnswerSubmittedMsg] = useState("");

  
  const submitQuestion = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "faq", faq.id), { Question: newQuestion });
    setQuestionSubmittedMsg("Question submitted!");
  };

  const submitAnswer = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "faq", faq.id), { Answer: newAnswer });
    setQuestionSubmittedMsg("Question submitted!");
  };

  const deleteFAQ = async () => {
    await deleteDoc(doc(db, "faq", faq.id));
  };

  const confirmDelete = () => {
    if (
      confirm("Are you sure you want to delete entry " + faq.Question + "?")
    ) {
      deleteFAQ();
    }
  };


return (
    <div style={{ display: "flex", alignItems: "center" }}>
      
      <div>
        <p>Question: {faq.Question}</p>
        <p>Answer: {faq.Answer}</p>
      </div>
      {!edit && (
        <button className="edit-button" onClick={() => toggleEdit(!edit)}>
          Edit
        </button>
      )}
      
    </div>
  );
}

export default FAQInfo;