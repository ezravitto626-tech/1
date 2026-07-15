let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {

    event.preventDefault();

    deferredPrompt = event;

    const installBtn = document.getElementById("installBtn");

    if (installBtn) {

        installBtn.style.display = "block";

    }

});


document.addEventListener("click", async (event)=>{

    if(event.target.id === "installBtn"){

        if(!deferredPrompt){

            alert("Install is not ready yet.");

            return;

        }


        deferredPrompt.prompt();


        const result = await deferredPrompt.userChoice;


        console.log(result.outcome);


        deferredPrompt = null;

    }

});
