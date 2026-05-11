import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA9B8KHcWGVNtqfJLMUgqJxVwo1Y7P5rvY",
  authDomain: "jumys-clean.firebaseapp.com",
  projectId: "jumys-clean",
  storageBucket: "jumys-clean.firebasestorage.app",
  messagingSenderId: "280120313730",
  appId: "1:280120313730:web:5ae67110e72330713e319b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;