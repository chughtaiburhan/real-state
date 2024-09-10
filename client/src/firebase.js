// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-343f2.firebaseapp.com",
  projectId: "mern-estate-343f2",
  storageBucket: "mern-estate-343f2.appspot.com",
  messagingSenderId: "746793318582",
  appId: "1:746793318582:web:ba427c21d549fbf4008e17"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);