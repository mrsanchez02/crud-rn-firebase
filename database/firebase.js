import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzp6DI9ks4xaphrPQxC8_xO7ie-cyzukc",
  authDomain: "react-native-firebase-514c5.firebaseapp.com",
  projectId: "react-native-firebase-514c5",
  storageBucket: "react-native-firebase-514c5.appspot.com",
  messagingSenderId: "477254608199",
  appId: "1:477254608199:web:505c3fcd5ec6e8b9b05862"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
