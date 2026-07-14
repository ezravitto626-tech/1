// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { 
getFirestore,
doc,
setDoc,
getDoc,
updateDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

window.firebaseFunctions = {

    doc,
    setDoc,
    getDoc,
    updateDoc

};

// Your Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyAMfY1MaLg-u9k6rCo1GYrq0x4nZNv7MEE",
  authDomain: "money-saver-pro.firebaseapp.com",
  projectId: "money-saver-pro",
  storageBucket: "money-saver-pro.firebasestorage.app",
  messagingSenderId: "582870623552",
  appId: "1:582870623552:web:e62dec344cc88d663146a5",
  measurementId: "G-9KYDS226CJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Make available globally too
window.auth = auth;
window.db = db;

console.log("✅ Firebase Connecteed");
