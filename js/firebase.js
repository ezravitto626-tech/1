import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { 
    getAuth 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { 
    getFirestore 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    getStorage
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";


const firebaseConfig = {
    // your Firebase config
};


const app =
initializeApp(firebaseConfig);


export const auth =
getAuth(app);


export const db =
getFirestore(app);


export const storage =
getStorage(app);

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
