
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC-pUghfsGMlwv5_cfFnZpKCujgsENhvBY",
    authDomain: "react-form-ab5b9.firebaseapp.com",
    projectId: "react-form-ab5b9",
    storageBucket: "react-form-ab5b9.appspot.com",
    messagingSenderId: "425886138524",
    appId: "1:425886138524:web:db855c3ac05bc5f13b6d59"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();
const auth = firebase.auth()


export { db,firebase,auth };