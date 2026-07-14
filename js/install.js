let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {

    event.preventDefault();

    deferredPrompt = event;

    const installBtn = document.getElementById("installBtn");

    if (installBtn) {

        installBtn.style.display = "block";

    }

});


document.addEventListener("DOMContentLoaded", () => {

    const installBtn = document.getElementById("installBtn");


    if (!installBtn) return;


    installBtn.addEventListener("click", async () => {


        if (!deferredPrompt) {

            alert("Install is not available yet. Try opening this page in Chrome or Edge.");

            return;

        }


        deferredPrompt.prompt();


        const result = await deferredPrompt.userChoice;


        if (result.outcome === "accepted") {

            console.log("Money Saver Pro installed!");

        }


        deferredPrompt = null;

        installBtn.style.display = "none";

    });

});
