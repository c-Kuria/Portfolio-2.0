import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCHw9LH0uVvHGWMzpgzQvkQGaaHL8IBawk",
    authDomain: "portfolio-v2-fcced.firebaseapp.com",
    projectId: "portfolio-v2-fcced",
    storageBucket: "portfolio-v2-fcced.firebasestorage.app",
    messagingSenderId: "447093756538",
    appId: "1:447093756538:web:90c569a8bd40ce9920a1c3",
    measurementId: "G-JRND7QXTLS"
  };

// Initialize with a unique name
const app = initializeApp(firebaseConfig, 'comments-app');
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };