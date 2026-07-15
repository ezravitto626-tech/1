// ======================================
// Money Saver Pro v1.1
// Family Dashboard System
// ======================================



let familyData =
    JSON.parse(
        localStorage.getItem("familyData")
    ) || null;



let familyGoals =
    JSON.parse(
        localStorage.getItem("familyGoals")
    ) || [];





// ------------------------------
// Save Family Data
// ------------------------------

async function saveFamilyData(){


    if(!familyData)
        return;



    localStorage.setItem(

        "familyData",

        JSON.stringify(familyData)

    );



    // Firebase Sync Ready

    try {


        if(
            window.firebaseFunctions &&
            window.db
        ){


            await window.firebaseFunctions.setDoc(

                window.firebaseFunctions.doc(

                    window.db,

                    "families",

                    familyData.code

                ),


                familyData


            );


        }


    }
    catch(error){

        console.log(
            "Firebase family sync waiting:",
            error
        );

    }



}







// ------------------------------
// Save Family Goals
// ------------------------------

function saveFamilyGoals(){


    localStorage.setItem(

        "familyGoals",

        JSON.stringify(familyGoals)

    );


}








// ------------------------------
// Load Family
// ------------------------------

function loadFamily(){


    familyData =
        JSON.parse(

            localStorage.getItem(
                "familyData"
            )

        ) || null;



    familyGoals =
        JSON.parse(

            localStorage.getItem(
                "familyGoals"
            )

        ) || [];



    updateFamilyDashboard();


    renderFamilyGoals();


}








// ------------------------------
// Create Family
// ------------------------------

window.createFamily =
async function(){



    const familyName =
        prompt(
            "Enter family name:"
        );



    if(!familyName)
        return;




    let userName =
        "Guest";




    if(
        window.auth &&
        window.auth.currentUser
    ){


        userName =
        window.auth.currentUser.email;


    }





    familyData = {


        name:
        familyName,



        code:

        "MSP-" +

        Math.floor(

            100000 +

            Math.random() * 900000

        ),



        created:
        Date.now(),




        members:[

            {

                id:
                Date.now(),


                name:
                userName,


                saved:
                0


            }

        ],




        totalSavings:
        0,



        goals:
        []



    };





    await saveFamilyData();



    updateFamilyDashboard();





    alert(

        "Family Created!\n\nInvite Code:\n"

        +

        familyData.code

    );



};

// ------------------------------
// Join Family
// ------------------------------

window.joinFamily =
async function(){


    const code =
        prompt(
            "Enter family invite code:"
        );



    if(!code)
        return;



    // Firebase lookup will connect here

    alert(
        "Searching for family: " + code
    );



    /*
    Future Firebase:

    const familyRef =
    doc(db,"families",code);

    const familySnap =
    await getDoc(familyRef);

    */


};








// ------------------------------
// Create Shared Family Goal
// ------------------------------

window.createFamilyGoal =
function(){



    const name =
        document
        .getElementById(
            "familyGoalName"
        )
        .value
        .trim();




    const amount =
        Number(
            document
            .getElementById(
                "familyGoalAmount"
            )
            .value
        );





    if(
        !name ||
        amount <= 0
    ){


        alert(
            "Enter goal name and amount."
        );


        return;

    }





    familyGoals.push({


        id:
        Date.now(),



        name,



        amount,



        saved:
        0,



        created:
        Date.now()



    });





    saveFamilyGoals();



    renderFamilyGoals();



    document
    .getElementById(
        "familyGoalName"
    )
    .value = "";



    document
    .getElementById(
        "familyGoalAmount"
    )
    .value = "";



};









// ------------------------------
// Render Family Goals
// ------------------------------

function renderFamilyGoals(){



    const container =
        document.getElementById(
            "familyGoals"
        );



    if(!container)
        return;





    if(
        familyGoals.length === 0
    ){


        container.innerHTML =
        "No shared goals yet.";


        return;


    }





    container.innerHTML = "";





    familyGoals.forEach(goal => {



        const percent =

        goal.amount > 0 ?

        Math.min(

            (
                goal.saved /
                goal.amount

            ) * 100,

            100

        )

        :

        0;





        container.innerHTML += `


<div class="card family-goal">



<h3>
🎯 ${goal.name}
</h3>




<p>

$${goal.saved.toFixed(2)}

/

$${goal.amount.toFixed(2)}

</p>





<div class="progress">

<div

class="progress-fill"

style="width:${percent}%">

</div>


</div>





<p>

${percent.toFixed(0)}%

Complete

</p>





<button onclick="addToFamilyGoal(${goal.id})">

➕ Contribute

</button>




<button onclick="removeFromFamilyGoal(${goal.id})">

➖ Remove

</button>




<button onclick="deleteFamilyGoal(${goal.id})">

🗑 Delete

</button>



</div>



`;



    });



}









// ------------------------------
// Add To Family Goal
// ------------------------------

window.addToFamilyGoal =
function(id){



    const amount =
        Number(

            prompt(
                "Amount to contribute:"
            )

        );



    if(
        isNaN(amount) ||
        amount <= 0
    )
        return;





    const goal =
        familyGoals.find(
            g => g.id === id
        );





    if(!goal)
        return;





    goal.saved += amount;



    saveFamilyGoals();



    renderFamilyGoals();



    updateFamilyDashboard();



};









// ------------------------------
// Remove From Family Goal
// ------------------------------

window.removeFromFamilyGoal =
function(id){



    const amount =
        Number(

            prompt(
                "Amount to remove:"
            )

        );



    if(
        isNaN(amount) ||
        amount <= 0
    )
        return;





    const goal =
        familyGoals.find(
            g => g.id === id
        );





    if(!goal)
        return;





    goal.saved =
        Math.max(
            goal.saved - amount,
            0
        );





    saveFamilyGoals();



    renderFamilyGoals();



    updateFamilyDashboard();



};









// ------------------------------
// Delete Family Goal
// ------------------------------

window.deleteFamilyGoal =
function(id){



    const goal =
        familyGoals.find(
            g => g.id === id
        );



    if(!goal)
        return;





    if(
        !confirm(
            `Delete "${goal.name}"?`
        )
    )
        return;





    familyGoals =
        familyGoals.filter(

            g => g.id !== id

        );





    saveFamilyGoals();



    renderFamilyGoals();



};

// ------------------------------
// Update Family Dashboard
// ------------------------------

function updateFamilyDashboard(){



    const name =
        document.getElementById(
            "familyName"
        );


    const code =
        document.getElementById(
            "familyCode"
        );


    const members =
        document.getElementById(
            "familyMembers"
        );


    const savings =
        document.getElementById(
            "familySavings"
        );


    const progress =
        document.getElementById(
            "familyProgress"
        );





    if(!name)
        return;






    // No family connected

    if(!familyData){



        name.textContent =
            "Not Connected";



        code.textContent =
            "----------";



        members.innerHTML =
            "No members yet.";



        savings.textContent =
            "0.00";



        if(progress){

            progress.style.width =
                "0%";

        }



        return;


    }







    name.textContent =
        familyData.name;



    code.textContent =
        familyData.code;







    let total = 0;





    familyData.members.forEach(
        member => {


            total +=
            Number(
                member.saved || 0
            );


        }
    );





    familyData.totalSavings =
        total;





    savings.textContent =
        total.toFixed(2);







    // Family leaderboard

    members.innerHTML =
    "<h3>🏆 Leaderboard</h3>";





    familyData.members
    .sort(
        (a,b)=>
        b.saved - a.saved
    )
    .forEach(
        (member,index)=>{



            let rank =
                index === 0
                ? "🥇"
                :
                index === 1
                ? "🥈"
                :
                index === 2
                ? "🥉"
                :
                "👤";





            members.innerHTML += `

<div class="card">


<h3>

${rank}

${member.name}

</h3>



<p>

💰 Saved:

$${Number(member.saved || 0)
.toFixed(2)}

</p>


</div>

`;



        }
    );







    // Family goal progress


    if(
        progress &&
        familyGoals.length > 0
    ){


        let goalTotal = 0;

        let savedTotal = 0;




        familyGoals.forEach(goal=>{


            goalTotal +=
            goal.amount;


            savedTotal +=
            goal.saved;


        });





        const percent =
            goalTotal > 0 ?

            (savedTotal / goalTotal)
            * 100

            :

            0;




        progress.style.width =
            Math.min(
                percent,
                100
            ) + "%";


    }





    saveFamilyData();



}









// ------------------------------
// Add Member Savings
// ------------------------------

function addMemberSavings(
    memberId,
    amount
){



    if(!familyData)
        return;




    const member =
        familyData.members.find(
            m =>
            m.id === memberId
        );



    if(!member)
        return;





    member.saved += amount;



    saveFamilyData();



    updateFamilyDashboard();



}









// ------------------------------
// Start Family System
// ------------------------------

document.addEventListener(

"DOMContentLoaded",

()=>{


    loadFamily();


}

);







// Make Available

window.updateFamilyDashboard =
updateFamilyDashboard;


window.renderFamilyGoals =
renderFamilyGoals;
