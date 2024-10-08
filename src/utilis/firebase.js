// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


import { initializeApp } from "firebase/app";
import { getAuth,signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCuQ3wNmtDNAZMhZe9MRjpTn1kAvDp4SOA",
  authDomain: "point-of-sale-8a42d.firebaseapp.com",
  projectId: "point-of-sale-8a42d",
  storageBucket: "point-of-sale-8a42d.appspot.com",
  messagingSenderId: "283428202868",
  appId: "1:283428202868:web:0c99ca55251c4294136421",
  measurementId: "G-Q0928NKHEQ"
};

// Initialize Firebase
// const analytics = getAnalytics(app);




const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db,signOut };