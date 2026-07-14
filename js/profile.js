import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


import {
    auth,
    db
} from "./firebase.js";



onAuthStateChanged(auth, async(user)=>{


    if(!user){

        return;

    }



    document.getElementById(
        "profileEmail"
    ).textContent = user.email;



    const userDoc =
    await getDoc(

        doc(
            db,
            "users",
            user.uid
        )

    );



    if(userDoc.exists()){


        const data =
        userDoc.data();



        document.getElementById(
            "profileName"
        ).textContent =
        data.name;



       document.getElementById(
"profileFamily"
).textContent =
data.familyName
||
data.familyCode
||
"Not connected";



    }


});

window.changeProfilePicture = function(event){


const file =
event.target.files[0];


if(!file)
return;



const reader =
new FileReader();



reader.onload = function(e){


document.getElementById(
"profileImage"
).src =
e.target.result;



localStorage.setItem(
"profileImage",
e.target.result
);



};



reader.readAsDataURL(file);


};