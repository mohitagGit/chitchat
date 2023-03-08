// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXN_3y6zKLyyaCLN22btN6svinS2W-9f8",
  authDomain: "chitchat-780fa.firebaseapp.com",
  projectId: "chitchat-780fa",
  storageBucket: "chitchat-780fa.appspot.com",
  messagingSenderId: "591910380821",
  appId: "1:591910380821:web:e1a3a600fd256919ca751c",
  measurementId: "G-PB47RMHCFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
// const analytics = getAnalytics(app);