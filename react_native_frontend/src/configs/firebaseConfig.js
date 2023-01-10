// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCK1JBUYs6vgeNpoUt7RyJtL5gJqlMSEE",
  authDomain: "animefy-c5d92.firebaseapp.com",
  projectId: "animefy-c5d92",
  storageBucket: "animefy-c5d92.appspot.com",
  messagingSenderId: "464032562133",
  appId: "1:464032562133:web:fdf3ac53f4a8cd0edbdb5c",
  measurementId: "G-WYV5FZV5S4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;