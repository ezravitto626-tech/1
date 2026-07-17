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


// Firebase configuration
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


// Export Firebase services
export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);


// Optional global access
window.auth = auth;
window.db = db;
window.storage = storage;


console.log("✅ Firebase Connected");
