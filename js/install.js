// ======================================
// Money Saver Pro v1.1
// PWA Install Button
// ======================================


let deferredPrompt = null;



const installButton =
document.getElementById(
    "installBtn"
);





// ------------------------------
// Listen For Install Prompt
// ------------------------------

window.addEventListener(
"beforeinstallprompt",
(event)=>{


    // Stop automatic browser popup

    event.preventDefault();



    // Save prompt

    deferredPrompt = event;



    // Show button

    if(installButton){

        installButton.style.display =
        "block";

    }


});








// ------------------------------
// Install App
// ------------------------------

if(installButton){


    installButton.addEventListener(

    "click",

    async()=>{


        if(!deferredPrompt){


            alert(
            "Money Saver Pro is already installed or cannot be installed yet."
            );


            return;

        }





        // Show install popup

        deferredPrompt.prompt();




        const result =
            await deferredPrompt.userChoice;




        if(
            result.outcome === "accepted"
        ){

            console.log(
            "Money Saver Pro installed"
            );


        }

        else{


            console.log(
            "Install cancelled"
            );


        }




        deferredPrompt = null;



        installButton.style.display =
        "none";



    });


}







// ------------------------------
// Detect Installed App
// ------------------------------

window.addEventListener(

"appinstalled",

()=>{


    console.log(
    "Money Saver Pro installed successfully!"
    );



    if(installButton){

        installButton.style.display =
        "none";

    }



});
