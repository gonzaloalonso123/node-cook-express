import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "nodecook-express.firebaseapp.com",
  projectId: "nodecook-express",
  storageBucket: "nodecook-express.appspot.com",
  messagingSenderId: "376331135590",
  appId: "1:376331135590:web:326ae0d16b0c8280f61ba7",
  measurementId: "G-J29FEKW97W",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
