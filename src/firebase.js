// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvqDXJqSjiTkWh89tpNiLEEsl48f3-PPQ",
  authDomain: "rafiarsyaa-portfolio.firebaseapp.com",
  databaseURL: "https://rafiarsyaa-portfolio-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rafiarsyaa-portfolio",
  storageBucket: "rafiarsyaa-portfolio.firebasestorage.app",
  messagingSenderId: "719658200840",
  appId: "1:719658200840:web:a8ff2be69093befa6c06bd",
  measurementId: "G-5DT97QBBXM"
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);

// Firestore
export const db = getFirestore(app);
