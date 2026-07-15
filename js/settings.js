// ======================================
// Money Saver Pro v1.1
// Settings System
// ======================================


import { auth, db, storage } from "./firebase.js";


import {

    onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {

    ref,
    uploadBytes,
    getDownloadURL

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";


import {

    doc,
    setDoc

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";



// ------------------------------
// Safe Text Update
// ------------------------------

function setText(id,value){


    const element =
        document.getElementById(id);



    if(element){

        element.textContent =
        value;

    }

}






// ------------------------------
// Load User Profile
// ------------------------------

async function loadProfile(user){



    if(!user)
        return;




    setText(
        "profileEmail",
        user.email
    );



    try {



        const userRef =
            doc(
                db,
                "users",
                user.uid
            );



        const userSnap =
            await getDoc(userRef);





        if(
            userSnap.exists()
        ){



            const data =
                userSnap.data();





            setText(

                "profileName",

                data.name ||
                "User"

            );





            setText(

                "profileFamily",

                data.familyCode ||
                "Not connected"

            );






            const image =
                document.getElementById(
                    "profileImage"
                );




            if(
                image &&
                data.photoURL
            ){

                image.src =
                data.photoURL;

            }




        }

        else{


            setText(
                "profileName",
                "User"
            );


            setText(
                "profileFamily",
                "Not connected"
            );


        }





    }


    catch(error){


        console.error(

            "Profile load error:",
            error

        );


    }



}








// ------------------------------
// Authentication Status
// ------------------------------

onAuthStateChanged(

auth,

(user)=>{


    window.currentUser =
    user;



    const status =
        document.getElementById(
            "accountStatus"
        );




    if(!status)
        return;





    if(user){



        status.innerHTML =

        `
        ✅ Signed in as

        <b>
        ${user.email}
        </b>
        `;



        loadProfile(user);



    }

    else{



        status.textContent =
        "Not signed in.";



        setText(
            "profileName",
            "Guest"
        );



        setText(
            "profileEmail",
            "Not signed in"
        );



        setText(
            "profileFamily",
            "Not connected"
        );



        const image =
        document.getElementById(
            "profileImage"
        );



        if(image){

            image.src =
            "images/default-profile.png";

        }



    }



});

// ======================================
// Save Profile Changes
// ======================================


let selectedProfileImage = null;



// ------------------------------
// Profile Picture Selection
// ------------------------------

window.changeProfilePicture = function(event){


    const file =
        event.target.files[0];


    if(!file)
        return;



    selectedProfileImage = file;



    const image =
        document.getElementById(
            "profileImage"
        );



    if(image){

        image.src =
        URL.createObjectURL(file);

    }


};






// ------------------------------
// Save Profile
// ------------------------------

window.saveProfileChanges =
async function(){


    const user =
        auth.currentUser;



    if(!user){


        alert(
        "Please sign in first."
        );


        return;

    }





    const nameInput =
        document.getElementById(
            "name"
        );



    const newName =
        nameInput ?
        nameInput.value.trim()
        :
        "";





    try{


        let photoURL = "";



        // Upload image later with Firebase Storage

        if(selectedProfileImage){


            photoURL =
            URL.createObjectURL(
                selectedProfileImage
            );


        }






        const userRef =
            doc(
                db,
                "users",
                user.uid
            );





        await setDoc(

            userRef,

            {


                name:
                newName ||
                "User",



                email:
                user.email,



                photoURL,



                updated:
                Date.now()



            },


            {
                merge:true
            }

        );







        setText(
            "profileName",
            newName ||
            "User"
        );




        alert(
        "✅ Profile saved!"
        );




    }


    catch(error){


        console.error(
            "Profile save error:",
            error
        );


        alert(
        "Could not save profile."
        );


    }



};

