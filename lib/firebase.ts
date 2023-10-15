// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVAm2dkX1SMnSh0xgHiFo47e4mzRw4ZI4",
  authDomain: "trabzon-rehberim.firebaseapp.com",
  projectId: "trabzon-rehberim",
  storageBucket: "trabzon-rehberim.appspot.com",
  messagingSenderId: "734976863302",
  appId: "1:734976863302:web:97feae87c3d51776ddee47",
  measurementId: "G-5SX2G6C0CS"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);