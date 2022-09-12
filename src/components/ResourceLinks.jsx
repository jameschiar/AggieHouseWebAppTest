import React, { useState, useEffect } from "react";

import { db } from "../firebase-config";
import { collection, deleteDoc, doc, updateDoc, onSnapshot } from "@firebase/firestore";

function ResourceLinks() {
  const [linksData, setLinksData] = useState([]);

  const linksCollectionRef = collection(db, "resourceLinks");

  useEffect(() => {

    let unsub;
    const getLinks = async () => {
      // onSnapshot listens to firebase for changes
      unsub = onSnapshot(linksCollectionRef, (collection) => {
        setFAQData(
          collection.docs.map((doc) => ({ id: doc.id, Question: doc.data().Question, Answer: doc.data().Answer }))
        );
      });
    };
    getFAQs();
  }, [])

  
  const submitQuestion = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "faqs", faqs.id), { Question: newQuestion });
    setQuestionSubmittedMsg("Question submitted!");
  };

  const submitAnswer = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "faqs", faqs.id), { Answer: newAnswer });
    setQuestionSubmittedMsg("Question submitted!");
  };

  const deleteFAQ = async () => {
    await deleteDoc(doc(db, "faqs", faqs.id));
  };

  const confirmDelete = () => {
    if (
      confirm("Are you sure you want to delete entry " + faqs.Question + "?")
    ) {
      deleteFAQ();
    }
  };
  
return (
    <div style={{ display: "flex", alignItems: "center" }}>
      
      <div>
        
      {faqData?.map((faq)=> {
        return (
        <div>
          <p>Question: {faq.Question}</p>
          <p>Answer: {faq.Answer}</p>
        </div>
          
            )
        })}
            
        
      </div>
    </div>
  );
}

export default FAQInfo;

// {!edit && (
//         <button className="edit-button" onClick={() => toggleEdit(!edit)}>
//           Edit
//         </button>
//       )}