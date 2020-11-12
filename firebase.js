import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCOr2NZ8mxBr3XUMXcHcuqVL_fGTj4rsU0",
  authDomain: "ourdrugs-51b8a.firebaseapp.com",
  databaseURL: "https://ourdrugs-51b8a.firebaseio.com",
  projectId: "ourdrugs-51b8a",
  storageBucket: "ourdrugs-51b8a.appspot.com",
  messagingSenderId: "758722304766",
  appId: "1:758722304766:web:16009f057cf0caef1c63af",
  measurementId: "G-CEBF8GK037"
};
// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const dbMenuAdd = db.collection('menuItems');
