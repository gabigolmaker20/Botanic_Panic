// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKk0zYvKlK-jqPMD9ebv7KLV1cIhuVOeE",
  authDomain: "botanicpanic-65ea2.firebaseapp.com",
  projectId: "botanicpanic-65ea2",
  storageBucket: "botanicpanic-65ea2.firebasestorage.app",
  messagingSenderId: "267189715784",
  appId: "1:267189715784:web:0f2c112c42c5067fda297d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider, signInWithPopup, signOut};