import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const API_KEY = import.meta.env.VITE_API_KEY
const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID
const STORAGE_BUCKET= import.meta.env.VITE_STORAGE_BUCKET
const MESSAGING_SENDER_ID = import.meta.env.VITE_MESSAGING_SENDER_ID
const APP_ID= import.meta.env.VITE_APP_ID
const MEASUREMENT_ID= import.meta.env.VITE_MEASUREMENT_ID

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);