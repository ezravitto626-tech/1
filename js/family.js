// ======================================
// Money Saver Pro v1.1
// Family Dashboard System
// Part 1 - Setup, Save, Create, Join
// ======================================


let familyData =
    JSON.parse(localStorage.getItem("familyData")) || null;


let familyGoals =
    JSON.parse(localStorage.getItem("familyGoals")) || [];



// ------------------------------
// Save Family Data
// ------------------------------

async function saveFamilyData() {

    if (!familyData) return;


    localStorage.setItem(
        "familyData",
        JSON.stringify(familyData)
    );


    try {

        if (
            window.firebaseFunctions &&
            window.db
        ) {

            await window.firebaseFunctions.setDoc(

                window.firebaseFunctions.doc(
                    window.db,
                    "families",
                    familyData.code
                ),

                familyData

            );

        }

    } catch(error) {

        console.log(
            "Firebase family sync waiting:",
            error
        );

    }

}



// ------------------------------
// Save Family Goals
// ------------------------------

function saveFamilyGoals() {

    localStorage.setItem(
        "familyGoals",
        JSON.stringify(familyGoals)
    );

}



// ------------------------------
// Load Family
// ------------------------------

function loadFamily() {


    familyData =
        JSON.parse(
            localStorage.getItem("familyData")
        ) || null;


    familyGoals =
        JSON.parse(
            localStorage.getItem("familyGoals")
        ) || [];


    updateFamilyDashboard();

    renderFamilyGoals();

}



// ------------------------------
// Create Family
// ------------------------------

window.createFamily = async function() {


    const familyName =
        prompt("Enter family name:");


    if (!familyName)
        return;



    let userName = "Guest";


    if (
        window.auth &&
        window.auth.currentUser
    ) {

        userName =
            window.auth.currentUser.email;

    }



    familyData = {

        name: familyName,


        code:
            "MSP-" +
            Math.floor(
                100000 +
                Math.random() * 900000
            ),


        created:
            Date.now(),


        members: [

            {
                id: Date.now(),

                name: userName,

                saved: 0
            }

        ],


        totalSavings: 0,


        goals: []

    };



    await saveFamilyData();


    updateFamilyDashboard();



    alert(
        "Family Created!\n\nInvite Code:\n" +
        familyData.code
    );


};



// ------------------------------
// Join Family
// ------------------------------

window.joinFamily = async function() {


    let code =
        prompt(
            "Enter family invite code:"
        );


    if (!code)
        return;



    code =
        code
        .trim()
        .toUpperCase();



    try {


        alert(
            "Searching for family: " + code
        );



        if (
            !window.firebaseFunctions ||
            !window.db
        ) {

            alert(
                "Firebase is not connected."
            );

            return;

        }



        const familyRef =
            window.firebaseFunctions.doc(

                window.db,

                "families",

                code

            );



        const familySnap =
            await window.firebaseFunctions.getDoc(
                familyRef
            );



        console.log(
            "Family found:",
            familySnap.exists()
        );



        if (
            !familySnap.exists()
        ) {

            alert(
                "Family not found."
            );

            return;

        }



        familyData =
            familySnap.data();



        let userName = "Guest";



        if (
            window.auth &&
            window.auth.currentUser
        ) {

            userName =
                window.auth.currentUser.email;

        }



        if (
            !familyData.members
        ) {

            familyData.members = [];

        }



        const alreadyJoined =
            familyData.members.some(

                member =>
                member.name === userName

            );



        if (
            !alreadyJoined
        ) {

            familyData.members.push({

                id: Date.now(),

                name: userName,

                saved: 0

            });

        }



        await saveFamilyData();


        updateFamilyDashboard();



        alert(
            "Successfully joined " +
            familyData.name
        );


    }
    catch(error) {


        console.error(
            "Join Family Error:",
            error
        );


        alert(
            "Unable to join family."
        );


    }


};

