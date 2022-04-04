import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCEw9P4JyLgCcD_x7V5x6wlsQYlYU3PUME",
    authDomain: "targetchat-3ca3b.firebaseapp.com",
    projectId: "targetchat-3ca3b",
    storageBucket: "targetchat-3ca3b.appspot.com",
    messagingSenderId: "544835691896",
    appId: "1:544835691896:web:8c9bd65d3e48ba0de0d48d",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export {auth, provider};
export default getFirestore();