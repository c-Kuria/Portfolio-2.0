import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs } from "@firebase/firestore"; 


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "Api-Key",
  authDomain: ".firebaseapp.com",
  projectId: "",
  storageBucket: "portofolio-web-3e8e8.appspot.com",
  messagingSenderId: "25195509306",
  appId: "1:25195509306:web:2b635dcf997137bf612703"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };