import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyDcAD4nPjxFv3P1hUrq-Sv5JT50r84UqI8",
    authDomain: "drivez-4f327.firebaseapp.com",
    databaseURL: "https://drivez-4f327-default-rtdb.firebaseio.com",
    projectId: "drivez-4f327",
    storageBucket: "drivez-4f327.appspot.com",
    messagingSenderId: "198435132181",
    appId: "1:198435132181:web:0739c1ce18ab34d7154f1c"
};

const firebase_app = initializeApp(firebaseConfig);
import {getDatabase} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
export const db = getDatabase(firebase_app);
