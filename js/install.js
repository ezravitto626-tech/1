// ======================================
// Money Saver Pro v1.1
// Install Button
// ======================================

let deferredPrompt;


const installBtn =
document.getElementById("installBtn");



// Browser detects install option

window.addEventListener(
"beforeinstallprompt",
(e)=>{


    e.preventDefault();


    deferredPrompt = e;



    if(installBtn){

        installBtn.style.display =
        "block";

    }


});




// Button clicked

if(installBtn){


    installBtn.addEventListener(
    "click",
    async()=>{


        if(!deferredPrompt){

            alert(
            "Install is not available yet."
            );

            return;

        }



        deferredPrompt.prompt();



        const choice =
        await deferredPrompt.userChoice;



        if(choice.outcome === "accepted"){

            console.log(
            "App installed"
            );

        }



        deferredPrompt = null;


    });


}



// Hide after install

window.addEventListener(
"appinstalled",
()=>{


    if(installBtn){

        installBtn.style.display =
        "none";

    }


});
