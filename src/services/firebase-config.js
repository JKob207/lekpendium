import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "lekpendium.firebaseapp.com",
  projectId: "lekpendium",
  storageBucket: "lekpendium.appspot.com",
  messagingSenderId: "731677468972",
  appId: "1:731677468972:web:f34d2dd52129e714736489"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
