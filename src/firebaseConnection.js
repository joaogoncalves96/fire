// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbphqO2Ww2LGmyjZGSu72QE3rpwvnOyFU",
  authDomain: "curso-a7b9d.firebaseapp.com",
  projectId: "curso-a7b9d",
  storageBucket: "curso-a7b9d.appspot.com",
  messagingSenderId: "355027362182",
  appId: "1:355027362182:web:279262d12386a09db7cc07",
  measurementId: "G-XJX7CJEDN1"
};

// Initialize Firebase
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;