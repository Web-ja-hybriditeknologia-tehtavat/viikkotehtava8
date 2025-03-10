// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { onSnapshot, query, getFirestore,collection,addDoc, serverTimestamp, doc, deleteDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJgpVd1VhzloxY40QDhBrThXkgyT6Xrs0",
  authDomain: "koulutyo-c22d1.firebaseapp.com",
  projectId: "koulutyo-c22d1",
  storageBucket: "koulutyo-c22d1.firebasestorage.app",
  messagingSenderId: "665072560630",
  appId: "1:665072560630:web:75a565ed3c86304ad67fd7"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const firestore = getFirestore();

const MESSAGES = 'messages';

export {
  firestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  MESSAGES
}