let deferredPrompt;

const installBtn = document.getElementById("installBtn");

if (installBtn) {
    installBtn.style.display = "none";
}

window.addEventListener("beforeinstallprompt", (e) => {
    console.log("✅ beforeinstallprompt fired");

    e.preventDefault();
    deferredPrompt = e;

    if (installBtn) {
        installBtn.style.display = "inline-block";
    }
});

window.addEventListener("appinstalled", () => {
    console.log("✅ App installed");
    deferredPrompt = null;

    if (installBtn) {
        installBtn.style.display = "none";
    }
});

if (installBtn) {
    installBtn.addEventListener("click", async () => {
        if (!deferredPrompt) {
            alert("Your browser hasn't made the app installable yet.");
            return;
        }

        await deferredPrompt.prompt();

        const choice = await deferredPrompt.userChoice;
        console.log("Install result:", choice.outcome);

        deferredPrompt = null;
        installBtn.style.display = "none";
    });
}
