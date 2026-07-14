// Money Saver Pro - Family Dashboard


let familyGoals =
JSON.parse(localStorage.getItem("familyGoals")) || [];


let familyData =
JSON.parse(localStorage.getItem("familyData")) || null;



// ===============================
// Save Family
// ===============================

async function saveFamilyData(){

    if(!familyData) return;


    localStorage.setItem(
        "familyData",
        JSON.stringify(familyData)
    );


    if(window.firebaseFunctions && window.db){

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



// ===============================
// Save Shared Goals
// ===============================

function saveFamilyGoals(){

    localStorage.setItem(
        "familyGoals",
        JSON.stringify(familyGoals)
    );

}



// ===============================
// Create Family
// ===============================

window.createFamily = async function(){


    const familyName =
    prompt("Enter family name:");



    if(!familyName)
    return;



    let userName =
    "User";



    if(window.auth && window.auth.currentUser){

        userName =
        window.auth.currentUser.email;

    }



    familyData = {


        name: familyName,


        code:
        "MSP-" +
        Math.floor(
            100000 +
            Math.random()*900000
        ),


        members:[

            {

                name:userName,

                saved:0

            }

        ],


        totalSavings:0


    };



    await saveFamilyData();



    updateFamilyDashboard();



    alert(
    "Family created!\nInvite Code: "
    + familyData.code
    );


};



// ===============================
// Join Family
// ===============================

window.joinFamily = async function(){


    const code =
    prompt(
    "Enter family invite code:"
    );



    if(!code)
    return;



    alert(
    "Joining family with code: "
    + code
    );



    // Firebase joining will be added next

};



// ===============================
// Create Shared Family Goal
// ===============================

window.createFamilyGoal = function(){


const name =
document.getElementById(
"familyGoalName"
).value;



const amount =
Number(
document.getElementById(
"familyGoalAmount"
).value
);



if(!name || amount <=0){

alert(
"Enter goal name and amount"
);

return;

}



familyGoals.push({

id:Date.now(),

name:name,

amount:amount,

saved:0

});



saveFamilyGoals();


renderFamilyGoals();


};



// ===============================
// Render Shared Goals
// ===============================

function renderFamilyGoals(){


const container =
document.getElementById(
"familyGoals"
);



if(!container)
return;



if(familyGoals.length===0){

container.innerHTML =
"No shared goals yet.";

return;

}



container.innerHTML="";



familyGoals.forEach(goal=>{


const percent =
Math.min(
(goal.saved / goal.amount)*100,
100
);



container.innerHTML += `

<div class="card">

<h3>
🎯 ${goal.name}
</h3>


<p>
$${goal.saved.toFixed(2)}
/
$${goal.amount.toFixed(2)}
</p>


<div class="progress">

<div class="progress-fill"
style="width:${percent}%">

</div>

</div>


<button onclick="addToFamilyGoal(${goal.id})">

➕ Contribute

</button>


</div>

`;

});


}



// ===============================
// Add To Family Goal
// ===============================

window.addToFamilyGoal=function(id){


const amount =
Number(
prompt(
"Amount to add:"
)
);



if(!amount || amount<=0)
return;



const goal =
familyGoals.find(
g=>g.id===id
);



if(!goal)
return;



goal.saved += amount;


saveFamilyGoals();


renderFamilyGoals();


};



// ===============================
// Update Family Dashboard
// ===============================

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



if(!name)
return;



if(!familyData){


name.textContent =
"Not Connected";


code.textContent =
"----------";


members.innerHTML =
"No members yet.";


savings.textContent =
"0.00";


return;


}



name.textContent =
familyData.name;


code.textContent =
familyData.code;



let total = 0;



familyData.members.forEach(member=>{

total += member.saved;

});



familyData.totalSavings =
total;



savings.textContent =
total.toFixed(2);



members.innerHTML =
"<h3>🏆 Leaderboard</h3>";



familyData.members
.sort(
(a,b)=>b.saved-a.saved
)
.forEach(
(member,index)=>{


let rank =
index===0 ? "🥇" :
index===1 ? "🥈" :
index===2 ? "🥉" :
"👤";



members.innerHTML += `

<div class="card">

<h3>
${rank}
${member.name}
</h3>


<p>
💰 Saved:
$${member.saved.toFixed(2)}
</p>


</div>

`;

});


saveFamilyData();


}



// Load

document.addEventListener(
"DOMContentLoaded",
()=>{

updateFamilyDashboard();

renderFamilyGoals();

});