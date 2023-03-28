import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwsfgZPN7DGxKXt51FcifAlnhEzI31V0o",
  authDomain: "cobyflix.firebaseapp.com",
  projectId: "cobyflix",
  storageBucket: "cobyflix.appspot.com",
  messagingSenderId: "235928879636",
  appId: "1:235928879636:web:2cff2eaa90714204859d01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);