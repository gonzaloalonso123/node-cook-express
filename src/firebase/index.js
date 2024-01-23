import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyAzjvYTDvameCzlMQmsgzXoKO7zuG0ojfo',
  authDomain: "nodecook-express.firebaseapp.com",
  projectId: "nodecook-express",
  storageBucket: "nodecook-express.appspot.com",
  messagingSenderId: "376331135590",
  appId: "1:376331135590:web:326ae0d16b0c8280f61ba7",
  measurementId: "G-J29FEKW97W"
};

console.log(process.env.FIREBASE_API_KEY);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);