// ======================================
// Money Saver Pro v1.1
// Install Button
// ======================================

let deferredPrompt;

const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
    console.log("Install prompt available");

    e.preventDefault();

    deferredPrompt = e;

    if (installBtn) {
        installBtn.style.display = "block";
    }
});


if (installBtn) {
    installBtn.addEventListener("click", async () => {

        if (!deferredPrompt) {
            alert("Installation is not available yet. Try refreshing the page.");
            return;
        }

        deferredPrompt.prompt();

        const { outcome } = await deferredPrompt.userChoice;

        console.log("Install choice:", outcome);

        deferredPrompt = null;
    });
}
