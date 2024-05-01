// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage"
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDFsGPjGUSU92dlxV5q-4yKNX1-y9QLD7o",
//   authDomain: "peekaplot-887d5.firebaseapp.com",
//   projectId: "peekaplot-887d5",
//   storageBucket: "peekaplot-887d5.appspot.com",
//   messagingSenderId: "662587444067",
//   appId: "1:662587444067:web:1f7ebf77a76b467f742156",
//   measurementId: "G-TB7MVRBC29"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);

// export const db = getFirestore(app);

// export const storage = getStorage();

// const analytics = getAnalytics(app);








import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyBdAif-EVUqB_1CnuQ3fQ8rQ-v6vJY0u9k",
  authDomain: "peek-a-plot-71624.firebaseapp.com",
  projectId: "peek-a-plot-71624",
  storageBucket: "peek-a-plot-71624.appspot.com",
  messagingSenderId: "352904401618",
  appId: "1:352904401618:web:4af0e993a311ff4527930b",
  measurementId: "G-H97FG8LBJD"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage();
