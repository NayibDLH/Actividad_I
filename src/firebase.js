import firebase from "firebase/app";
import "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyBYKkFJClgvlyNo56IuWCmZ2coZj9Y_Pfs",
  authDomain: "crud01-3b636.firebaseapp.com",
  projectId: "crud01-3b636",
  storageBucket: "crud01-3b636.firebasestorage.app",
  messagingSenderId: "1013962708420",
  appId: "1:1013962708420:web:12eae414c8ae11fab98091"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export {firebase}