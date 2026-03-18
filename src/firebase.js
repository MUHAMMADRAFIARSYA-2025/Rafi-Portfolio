// src/firebase.js
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// --- KONFIGURASI SESUAI SCREENSHOT TERAKHIR ---
const firebaseConfig = {
  apiKey: "AIzaSyCvqDXJqSjiTkWh89tpNiLEEsl48f3-PPQ", // Perhatikan huruf 'l' kecil ini
  authDomain: "rafiarsyaa-portfolio.firebaseapp.com",
  databaseURL: "https://rafiarsyaa-portfolio-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rafiarsyaa-portfolio",
  storageBucket: "rafiarsyaa-portfolio.firebasestorage.app",
  messagingSenderId: "719658200840",
  appId: "1:719658200840:web:a8ff2be69093befa6c06bd",
  measurementId: "G-5DT97QBBXM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth & Database
export const auth = getAuth(app);
export const db = getFirestore(app);

// --- FUNGSI LOGIN & LOGOUT ---
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error login:", error);
  }
};

export const logout = () => {
  signOut(auth);
};