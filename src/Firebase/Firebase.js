// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfUsV_07Wx91MYsegoZuEKJjvYutE7LfA",
  authDomain: "moviezx-9af9d.firebaseapp.com",
  projectId: "moviezx-9af9d",
  storageBucket: "moviezx-9af9d.appspot.com",
  messagingSenderId: "3220495686",
  appId: "1:3220495686:web:ef324a337aa2cfa6775947",
  measurementId: "G-MP66W8Y3ET",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const MovieCollection = collection(db, "movies");
export const ReviewsCollection = collection(db, "Reviews");
export default app;
