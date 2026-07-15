// ======================================
// Money Saver Pro v1.1
// Settings System
// ======================================


import { auth, db } from "./firebase.js";


import {

    onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


import {

    doc,
    getDoc

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

