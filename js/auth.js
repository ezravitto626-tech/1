import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { auth, db } from "./firebase.js";


// ======================
// Create Account
// ======================

window.signup = async function(){

    const name =
    document.getElementById("name").value.trim();


    const email =
    document.getElementById("signupEmail").value.trim();


    const password =
    document.getElementById("signupPassword").value;



    if(!name || !email || !password){

        alert("Please fill out all fields.");

        return;

    }


    try{

        const result =
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );


        await setDoc(
            doc(
                db,
                "users",
                result.user.uid
            ),
            {
                name:name,
                email:email,
                familyCode:null,
                createdAt:Date.now()
            }
        );


        alert("Account created!");


        window.location.href =
        "index.html";


    }
    catch(error){

        alert(error.message);

    }

};



// ======================
// Login
// ======================

window.login = async function(){


    const email =
    document.getElementById("loginEmail").value.trim();


    const password =
    document.getElementById("loginPassword").value;



    if(!email || !password){

        alert("Enter email and password.");

        return;

    }



    try{


      const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
);

console.log("Signed in:", userCredential.user);

alert("Welcome back!");

window.location.href = "index.html";


    }
    catch(error){

        alert(error.message);

    }

};



// ======================
// Logout
// ======================

window.logout = async function(){


    await signOut(auth);


    window.location.href =
    "login.html";


};



// ======================
// Switch Login/Create Account
// ======================

window.showSignup = function(){

    document.getElementById(
        "loginSection"
    ).style.display="none";


    document.getElementById(
        "signupSection"
    ).style.display="block";


};



window.showLogin = function(){

    document.getElementById(
        "signupSection"
    ).style.display="none";


    document.getElementById(
        "loginSection"
    ).style.display="block";


};

window.showAccountLogin = function(){

    document.getElementById("accountLogin").style.display="block";

    document.getElementById("accountSignup").style.display="none";

};


window.showAccountSignup = function(){

    document.getElementById("accountSignup").style.display="block";

    document.getElementById("accountLogin").style.display="none";

console.log("✅ auth.js loaded");
    
};
