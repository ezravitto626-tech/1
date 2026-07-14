import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

    const accountStatus = document.getElementById("accountStatus");
    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");
    const profileFamily = document.getElementById("profileFamily");

    if (!accountStatus) return;

    if (user) {

        accountStatus.innerHTML = `✅ Signed in as <b>${user.email}</b>`;
        profileEmail.textContent = user.email;

        try {

            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {

                const data = userSnap.data();

                profileName.textContent = data.name || "User";

                profileFamily.textContent =
                    data.familyCode || "Not connected";

            } else {

                profileName.textContent = "User";
                profileFamily.textContent = "Not connected";

            }

        } catch (error) {

            console.error(error);

        }

    } else {

        accountStatus.textContent = "Not signed in.";

        profileName.textContent = "Guest";
        profileEmail.textContent = "Not signed in";
        profileFamily.textContent = "Not connected";

    }

});