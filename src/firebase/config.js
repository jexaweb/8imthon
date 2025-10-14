import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ To‘g‘ri Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDqhyMRgS0mtiOHWk3u7f5uAQXkpWCR5ys",
  authDomain: "task-man-ed391.firebaseapp.com",
  projectId: "task-man-ed391",
  storageBucket: "task-man-ed391.firebasestorage.app",
  messagingSenderId: "334887951145",
  appId: "1:334887951145:web:502ce7df41a9e093c77538",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
