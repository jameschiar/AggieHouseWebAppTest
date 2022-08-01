import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyBVe5EXHTpRPIiNSAGEkstZtpIWxmz2Mfw',
  authDomain: "aggie-house.firebaseapp.com",
  projectId: "aggie-house",
  storageBucket: "aggie-house.appspot.com",
  messagingSenderId: "509740822970",
  appId: "1:509740822970:web:22da7e2fc3e1b3b9c76d83",
  measurementId: "G-K0TCQC23WT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
