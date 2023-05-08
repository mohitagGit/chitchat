// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// paste your code here
const firebaseConfig = {
  apiKey: "AIzaSyBXN_*****************-9f8",
  authDomain: "chitchat-******.firebaseapp.com",
  projectId: "chitchat-****",
  storageBucket: "chitchat-****.appspot.com",
  messagingSenderId: "59191038****",
  appId: "1:591910380821:web:e1a3*********6919ca751c",
  measurementId: "G-PB47R****"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
// const analytics = getAnalytics(app);