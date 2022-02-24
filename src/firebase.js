import firebase from "firebase/app";
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDSqwl7dy_upxLbCnayuMTPfYGRPZZb_Xg",
    authDomain: "devcamp-firebase-ac0f9.firebaseapp.com",
    databaseURL: "https://devcamp-firebase-ac0f9-default-rtdb.firebaseio.com",
    projectId: "devcamp-firebase-ac0f9",
    storageBucket: "devcamp-firebase-ac0f9.appspot.com",
    messagingSenderId: "999489926085",
    appId: "1:999489926085:web:be3ba24750fa327bfd91ac"
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();