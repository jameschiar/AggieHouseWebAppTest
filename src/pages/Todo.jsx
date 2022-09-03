import React, {useState, useCallback, useEffect, useRef} from 'react';
import NavBar from '../components/NavBar.jsx';
import ChoreTable from "../components/ChoreTable.jsx";

import { db } from '../firebase-config.js';
import { collection, doc, updateDoc, getDocs, addDoc, onSnapshot, deleteDoc } from 'firebase/firestore';

import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

// import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './css/Todo.css';

const localizer = momentLocalizer(moment);
const DragandDropCalendar = withDragAndDrop(Calendar)


function Todo() {

  // Variables for the Meals Calendar
  const [modalState, setModalState] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(undefined);
  const [myMeals, setMeals] = useState([]);
  const mealsCollectionRef = collection(db, "meals");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [modalState]);

  useEffect(() => {

    const getMeals = async () => {
      onSnapshot(mealsCollectionRef, (collection) => {
        setMeals(collection.docs.map((doc) => ({id: doc.id, title: doc.data().title, start: doc.data().start.toDate(), end: doc.data().end.toDate(), ingredients: doc.data().ingredients })));
      })
    }
    getMeals();
    
  },[]);

  const shiftSelection = (meals) => {
    setSelectedMeal(meals);
    setModalState(true);
  }
  
  const Modal = () => {

    const [newIngredients, setIngredients] = useState("");

    
     const updateIngredients = async (id, ingredients) => {
       if (newIngredients.length == 0){
          alert("Cannot submit empty ingredient");
          return;
        }
       const mealDoc = doc(db, "meals", id);
       const newFields = {ingredients: newIngredients};
       await updateDoc(mealDoc, newFields);
     };
    
    return(
        <div className={`modal-${modalState == true ? 'show' : 'hide'}`}>
          <div className="modalTitle">
            {selectedMeal.title}
          </div>
          <div className="modalBody">
              Ingredients: {selectedMeal.ingredients}
          </div>
          <div className="modalNotes">
            Add Ingredients: <input placeholder="Ex: Rice" onChange={(e) => {setIngredients(e.target.value);}} />
            <button 
              className='modalSubmit'
              onClick={() => {
                updateIngredients(selectedMeal.id, selectedMeal.ingredients);
                setModalState(true);
              }}> Submit </button>
          </div>
          <br/>
          <div className="modalFooter">
            <button
              className='closeModal'
              onClick={() => {
                setModalState(false);
              }}
              > Cancel </button>
            <button
              className='modalDelete'
              onClick = {() => {deleteMeal(selectedMeal.id); setModalState(false);}}
              > Delete </button>
          </div>
      </div>
    );
  } 

  const deleteMeal = async (id) => {
    const mealDoc = doc(db, "meals", id);
    await deleteDoc(mealDoc);
  }
  
  const slotSelection = useCallback(
    ({ start, end }) => {
      const title = window.prompt("New Meal Name:");
      if (title) {        
          const addMeal = async () => {
          await addDoc(mealsCollectionRef, {title: title, start: start, end: end, notes: ""});
        }
        addMeal();
      } else {
        // display error
      }
    },
    [setMeals]
  );

  // const moveMeal = useCallback(
  //   ({ meal, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
  //     const { allDay } = meal
  //     if( !allDay && droppedOnAllDaySlot) {
  //       meal.allday = true
  //     }
  //     console.log(start, end)

  //     const updateMeal = async () => {
  //       await updateDoc(doc(db, "meals", meal.id), {start: start, end: end})
  //     }
  //     updateMeal();
      
  //   },
  //   [setMeals]
  // )

  console.log(myMeals);

  // *********************************************************************************************
  //                              Chores code mainly begins here
  // *********************************************************************************************

  const [isBusy, setBusy] = useState(true);
  const [showChoreForm, setShowChoreForm] = useState(false);
  const [statusData, setStatusData] = useState([]);
  const [newChore, setNewChore] = useState("");
  const [deleteState, toggleDeleteState] = useState(false);

  const choresCollectionRef = collection(db, "chores");

  useEffect(() => {
    // get all chore data from database
    let unsub;
    const getChoreData = async () => {
      // onSnapshot listens to firebase for changes
      unsub = onSnapshot(choresCollectionRef, (collection) => {
        setStatusData(
          collection.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    };
    getChoreData();
    setBusy(false);

    // useEffect cleanup function
    return () => {
      unsub(); // disable onSnapshot
      setBusy(true);
    };
  }, []);

  // add resident to table
  // const addChore = async (e) => {
  //   e.preventDefault(); // prevent page refresh

  //   // error check for empty first or last name
  //   if (newChore.length == 0) {
  //     alert("Must include chore");
  //     return;
  //   }

  //   // set up fields to add to attendance collection
  //   const fields = {
  //     chore: newChore,
  //     status: "yes",
  //   };

  //   await addDoc(collection(db, "chores"), fields);

  //   // reset values and close form
  //   setNewChore("");
  //   setShowChoreForm(false);
  // };

  const cancelForm = () => {
    setShowChoreForm(false);
    setNewChore("");
  };
  
  return (
      <div>
        <NavBar/>
        <div>
        <h1 class="meals-header"> Meals </h1>
        {selectedMeal && <Modal/>}
        </div>
        <div class="meals-container">
          <DragandDropCalendar
            style={{backgroundColor: '#FAF9F9'}}
            localizer={localizer}
            defaultView={'month'}
            events={myMeals}
            defaultDate={moment().toDate()}
            onSelectEvent={(e) => shiftSelection(e)}
            onSelectSlot={slotSelection}
            selectable
          />
          <br/>
        </div>
        <div>
          <h1 class="chores-header"> Chores </h1>
        </div>
        {!isBusy && (
        <div>
          <ChoreTable
            choreData={statusData}
          />
        </div>
      )}
    </div>
    );
}

export default Todo;