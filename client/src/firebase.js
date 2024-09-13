// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; // Import getStorage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-343f2.firebaseapp.com",
  projectId: "mern-estate-343f2",
  storageBucket: "mern-estate-343f2.appspot.com",
  messagingSenderId: "746793318582",
  appId: "1:746793318582:web:ba427c21d549fbf4008e17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initialize app first
const storage = getStorage(app); // Then initialize storage with the app instance

export { app, storage }; // Export both app and storage
