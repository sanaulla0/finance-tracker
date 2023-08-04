// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore, doc,setDoc} from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyA9M-Om577oqW9ZoDKqBRoTQT09qL2NoXM",
  authDomain: "finance-a931a.firebaseapp.com",
  projectId: "finance-a931a", 
  storageBucket: "finance-a931a.appspot.com",
  messagingSenderId: "1018080664920",
  appId: "1:1018080664920:web:b7cb20d5bea90ab57cd92d",
  measurementId: "G-9HEPB8BGXF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export{db , auth,provider,doc,setDoc};

