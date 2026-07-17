// ======================================
// Money Saver Pro v1.1
// Settings System (Clean Version)
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



// ================================
// Helpers
// ================================

function setText(id, value){

    const element =
    document.getElementById(id);


    if(element){

        element.textContent = value;

    }

}



// ================================
// Profile Image
// ================================

let selectedProfileImage = null;



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



// ================================
// Upload Image
// ================================

async function uploadProfilePicture(user){


    if(!selectedProfileImage)
        return null;



    const imageRef =
    ref(
        storage,
        "profilePictures/" + user.uid
    );



    await uploadBytes(
        imageRef,
        selectedProfileImage
    );



    return await getDownloadURL(
        imageRef
    );


}



// ================================
// Load Profile
// ================================

async function loadProfile(user){


    if(!user)
        return;



    setText(
        "profileEmail",
        user.email
    );



    try{


        const userRef =
        doc(
            db,
            "users",
            user.uid
        );



        const snapshot =
        await getDoc(userRef);



        if(snapshot.exists()){


            const data =
            snapshot.data();



            setText(
                "profileName",
                data.name || "User"
            );



            setText(
                "profileFamily",
                data.familyCode || "Not connected"
            );



            if(data.photoURL){

                const image =
                document.getElementById(
                    "profileImage"
                );


                if(image){

                    image.src =
                    data.photoURL;

                }

            }


        }



    }
    catch(error){

        console.error(
            "Profile loading error:",
            error
        );

    }


}




// ================================
// Authentication Listener
// ================================


onAuthStateChanged(
auth,
(user)=>{


    window.currentUser =
    user;



    const status =
    document.getElementById(
        "accountStatus"
    );



    if(user){


        if(status){

            status.innerHTML =
            `
            ✅ Signed in as
            <b>${user.email}</b>
            `;

        }



        loadProfile(user);



    }
    else{


        if(status){

            status.textContent =
            "Not signed in.";

        }



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
            "./images/default-profile.png";

        }


    }


});




// ================================
// Save Profile
// ================================


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



    const name =
    nameInput ?
    nameInput.value.trim()
    :
    "User";



    try{


        let photoURL = null;



        if(selectedProfileImage){


            photoURL =
            await uploadProfilePicture(
                user
            );

        }




        await setDoc(

            doc(
                db,
                "users",
                user.uid
            ),


            {

                name:
                name || "User",

                email:
                user.email,

                photoURL:
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
            name || "User"
        );



        alert(
        "✅ Profile Saved!"
        );


    }
    catch(error){


        console.error(
            error
        );


        alert(
        "Could not save profile."
        );


    }


};



// ================================
// Load Local Picture
// ================================


function loadProfilePicture(){


    const saved =
    localStorage.getItem(
        "profilePicture"
    );



    const image =
    document.getElementById(
        "profileImage"
    );



    if(saved && image){

        image.src =
        saved;

    }


}



document.addEventListener(
"DOMContentLoaded",
()=>{

    loadProfilePicture();

});



console.log(
"✅ settings.js loaded"
);
