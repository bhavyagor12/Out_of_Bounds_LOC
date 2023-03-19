// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfsrrs6RNQVJ9qaeOtGn837o4XToUWfP0",
  authDomain: "coupon-generator-a00eb.firebaseapp.com",
  databaseURL: "https://coupon-generator-a00eb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "coupon-generator-a00eb",
  storageBucket: "coupon-generator-a00eb.appspot.com",
  messagingSenderId: "65962690018",
  appId: "1:65962690018:web:294b4ae789709339e0a5bb"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
