// ==========================
// Money Saver Pro v1.0
// App Navigation
// ==========================

function showPage(pageId) {

    // Hide every page
    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active");
    });

    // Remove active button
    const buttons = document.querySelectorAll(".nav-btn");

    buttons.forEach(button => {
        button.classList.remove("active");
    });

    // Show selected page
    document
        .getElementById(pageId)
        .classList.add("active");

    // Highlight selected button
    buttons.forEach(button => {

        if (
            button.getAttribute("onclick")
            === `showPage('${pageId}')`
        ) {

            button.classList.add("active");

        }

    });

}

// App starts on Home
document.addEventListener("DOMContentLoaded", () => {

    showPage("home");

});