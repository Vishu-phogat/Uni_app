// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "uni-auth-644fa.firebaseapp.com",
  projectId: "uni-auth-644fa",
  storageBucket: "uni-auth-644fa.appspot.com",
  messagingSenderId: "562720073631",
  appId: "1:562720073631:web:a02453d777d543fa167faa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);