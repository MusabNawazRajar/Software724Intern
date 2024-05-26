// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBBxcEXGXIi4tkdKWTr5GuSyeMKSBSPjCo",
  authDomain: "smart-baby-cradle-37a31.firebaseapp.com",
  databaseURL: "https://smart-baby-cradle-37a31-default-rtdb.firebaseio.com",
  projectId: "smart-baby-cradle-37a31",
  storageBucket: "smart-baby-cradle-37a31.appspot.com",
  messagingSenderId: "987156182780",
  appId: "1:987156182780:web:42f213a872a58229d8c979"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);