// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "dev-s-blog.firebaseapp.com",
  projectId: "dev-s-blog",
  storageBucket: "dev-s-blog.appspot.com",
  messagingSenderId: "1017521992061",
  appId: "1:1017521992061:web:e614e45c90c34f6896dc14",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
