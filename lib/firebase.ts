// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJcAMFQVe4Sd_scBkwYFd5Cl9iC3XtkLk",
  authDomain: "trabzon-rehberi.firebaseapp.com",
  projectId: "trabzon-rehberi",
  storageBucket: "trabzon-rehberi.appspot.com",
  messagingSenderId: "612081009217",
  appId: "1:612081009217:web:4333df0a586ef6ac7cfcc0",
  measurementId: "G-NP4G3EBGS0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);