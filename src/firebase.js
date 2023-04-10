// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJGy2wfOZHXnvDHdt-dE7MriondGRATY0",
  authDomain: "clone-6cf47.firebaseapp.com",
  projectId: "clone-6cf47",
  storageBucket: "clone-6cf47.appspot.com",
  messagingSenderId: "988132714800",
  appId: "1:988132714800:web:e6ec2c428b84d8d75780f5",
  measurementId: "G-QJCPZ508BS",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

const auth = firebase.auth();
export { db, auth };
