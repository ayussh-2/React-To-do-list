import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB6U5eqLR2wizyzTUF6M-lnJRQbiNLcmAQ",
    authDomain: "react-todo-4f20b.firebaseapp.com",
    projectId: "react-todo-4f20b",
    storageBucket: "react-todo-4f20b.appspot.com",
    messagingSenderId: "1001839149269",
    appId: "1:1001839149269:web:426cf00e1d531958ad225c",
    measurementId: "G-M8BVGQV66V",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const db = getFirestore(app);
