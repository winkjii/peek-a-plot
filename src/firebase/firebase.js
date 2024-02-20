// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFsGPjGUSU92dlxV5q-4yKNX1-y9QLD7o",
  authDomain: "peekaplot-887d5.firebaseapp.com",
  projectId: "peekaplot-887d5",
  storageBucket: "peekaplot-887d5.appspot.com",
  messagingSenderId: "662587444067",
  appId: "1:662587444067:web:1f7ebf77a76b467f742156",
  measurementId: "G-TB7MVRBC29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

const analytics = getAnalytics(app);