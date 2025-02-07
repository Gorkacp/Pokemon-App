import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEHQPDODo9pQXPYXwpFwJgC3F-YoGNsGs",
  authDomain: "pokemon-app-4db70.firebaseapp.com",
  projectId: "pokemon-app-4db70",
  storageBucket: "pokemon-app-4db70.firebasestorage.app",
  messagingSenderId: "567890081185",
  appId: "1:567890081185:web:6efd1f6db4f82ac72b47e0",
  measurementId: "G-PP0PLFE6VN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export default app;
export { googleProvider };