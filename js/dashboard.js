// ======================================
// Money Saver Pro v1.1
// Dashboard Manager
// ======================================



// ------------------------------
// Safe Element Helper
// ------------------------------

function setText(id, value) {

    const element =
        document.getElementById(id);


    if(element){

        element.textContent = value;

    }

}





// ------------------------------
// Update Dashboard
// ------------------------------

function updateDashboard(){


    if(!appData){

        console.error(
            "App data not loaded."
        );

        return;

    }



    setText(
        "totalSaved",
        Number(appData.totalSaved || 0)
        .toFixed(2)
    );



    setText(
        "goalCount",
        appData.goals ?
        appData.goals.length :
        0
    );



    setText(
        "streak",
        appData.streak || 0
    );



    updateAchievements();


    updateSavingsBreakdown();


    updateFeaturedGoal();


    updateRecentActivity();


}





// ------------------------------
// Achievements
// ------------------------------

function updateAchievements(){


    if(!appData.achievements){

        appData.achievements = [];

    }



    const achievements = [];




    if(appData.totalSaved >= 100){

        achievements.push(
            "💰 First $100 Saved"
        );

    }



    if(appData.goals.length >= 5){

        achievements.push(
            "🎯 Goal Collector"
        );

    }



    const completedGoals =
        appData.goals.filter(goal =>
            goal.completed
        );



    if(completedGoals.length >= 1){

        achievements.push(
            "🏆 First Goal Complete"
        );

    }



    if(appData.streak >= 7){

        achievements.push(
            "🔥 7 Day Saving Streak"
        );

    }



    appData.achievements =
        achievements;



    setText(
        "badgeCount",
        achievements.length
    );



    saveData();


}





// ------------------------------
// Featured Goal
// ------------------------------

function updateFeaturedGoal(){


    const container =
        document.getElementById(
            "featuredGoal"
        );


    if(!container) return;



    if(!appData.goals ||
       appData.goals.length === 0){


        container.innerHTML = `

        <div class="featured-placeholder">

        🎯 Create your first goal to see it here.

        </div>

        `;


        return;

    }





    let bestGoal =
        appData.goals[0];



    appData.goals.forEach(goal => {



        const currentProgress =
            goal.amount > 0 ?
            goal.saved / goal.amount :
            0;



        const bestProgress =
            bestGoal.amount > 0 ?
            bestGoal.saved / bestGoal.amount :
            0;



        if(
            currentProgress >
            bestProgress
        ){

            bestGoal = goal;

        }


    });




    const percent =
        Math.min(
            (
                bestGoal.saved /
                bestGoal.amount
            ) * 100,
            100
        );



    container.innerHTML = `

<div class="featured-card">


<img 
src="${bestGoal.image || './images/default-goal.png'}"
alt="${bestGoal.name}">


<div class="featured-info">


<h2>
${bestGoal.name}
</h2>


<p>
${bestGoal.category}
</p>



<div class="progress">

<div 
class="progress-fill"
style="width:${percent}%;">
</div>

</div>



<p>

$${bestGoal.saved.toFixed(2)}

/

$${bestGoal.amount.toFixed(2)}

</p>



</div>


</div>

`;

}

// ------------------------------
// Savings Breakdown
// ------------------------------

function updateSavingsBreakdown(){


    const box =
        document.getElementById(
            "savingBreakdown"
        );



    if(!box) return;




    if(
        !appData.goals ||
        appData.goals.length === 0
    ){

        box.innerHTML =
        "No savings yet.";

        return;

    }



    let html = "";



    appData.goals.forEach(goal => {



        if(goal.saved > 0){


            html += `

<div class="saving-item">

🎯 ${goal.name}

<br>

💰 Saved:
$${goal.saved.toFixed(2)}

</div>

<br>

`;

        }


    });



    box.innerHTML =
        html ||
        "No savings yet.";

}





// ------------------------------
// Recent Activity
// ------------------------------

function updateRecentActivity(){


    const box =
        document.getElementById(
            "recentActivity"
        );



    if(!box) return;



    if(
        !appData.activity ||
        appData.activity.length === 0
    ){

        box.innerHTML =
        "No activity yet.";

        return;

    }



    box.innerHTML = "";



    appData.activity
    .slice(0,10)
    .forEach(item => {


        box.innerHTML += `

<div class="activity-item">

<p>
${item.text}
</p>

<small>
${item.date}
</small>

</div>

<br>

`;

    });


}





// ------------------------------
// Add General Savings
// ------------------------------

window.addMoney = function(){



    let amount =
        Number(
            prompt(
            "How much money did you save?"
            )
        );



    if(
        isNaN(amount) ||
        amount <= 0
    ){

        alert(
        "Please enter a valid amount."
        );

        return;

    }




    appData.totalSaved += amount;



    if(!appData.activity){

        appData.activity = [];

    }



    appData.activity.unshift({

        text:
        `💰 Added $${amount.toFixed(2)} to savings`,

        date:
        new Date().toLocaleString()

    });



    if(!appData.savingsHistory){

        appData.savingsHistory = [];

    }



    appData.savingsHistory.push({

        amount,

        date: Date.now()

    });



    saveData();


    updateDashboard();



    alert(
    `Added $${amount.toFixed(2)}!`
    );


};







// ------------------------------
// Savings Menu
// ------------------------------

window.openSavingsMenu = function(){


    const menu =
        document.getElementById(
            "savingsMenu"
        );


    if(menu){

        menu.style.display =
        "flex";

    }


};





window.closeSavingsMenu = function(){


    const menu =
        document.getElementById(
            "savingsMenu"
        );


    if(menu){

        menu.style.display =
        "none";

    }


};






// ------------------------------
// Subtract Savings
// ------------------------------

window.subtractSavings = function(){



    const amount =
        Number(
        prompt(
        "How much do you want to subtract?"
        )
        );



    if(
        isNaN(amount) ||
        amount <= 0
    ){

        return;

    }



    appData.totalSaved =
        Math.max(
            appData.totalSaved - amount,
            0
        );




    appData.activity.unshift({

        text:
        `➖ Removed $${amount.toFixed(2)} from savings`,

        date:
        new Date().toLocaleString()

    });



    saveData();


    updateDashboard();


    closeSavingsMenu();


};






// ------------------------------
// Reset Savings
// ------------------------------

window.resetSavings = function(){



    const confirmReset =
        confirm(
        "Reset all savings?"
        );



    if(!confirmReset)
        return;




    appData.totalSaved = 0;



    appData.goals.forEach(goal => {

        goal.saved = 0;

        goal.completed = false;

    });



    appData.activity.unshift({

        text:
        "🗑 Savings were reset",

        date:
        new Date().toLocaleString()

    });




    saveData();


    updateDashboard();


    closeSavingsMenu();



};

// ------------------------------
// Sync Completed Goals
// ------------------------------

function syncCompletedGoals(){


    if(
        !appData.goals ||
        appData.goals.length === 0
    ){

        return;

    }



    appData.goals.forEach(goal => {



        if(
            goal.saved >= goal.amount &&
            !goal.completed
        ){


            goal.completed = true;



            if(!appData.activity){

                appData.activity = [];

            }



            appData.activity.unshift({

                text:
                `🏆 Completed "${goal.name}"`,

                date:
                new Date().toLocaleString()

            });


        }



    });



    saveData();


}





// ------------------------------
// Dashboard Refresh Timer
// ------------------------------

function refreshDashboard(){


    syncCompletedGoals();


    updateDashboard();


}







// ------------------------------
// App Startup
// ------------------------------

document.addEventListener(

"DOMContentLoaded",

()=>{


    if(!appData.goals){

        appData.goals = [];

    }



    if(!appData.activity){

        appData.activity = [];

    }



    if(!appData.savingsHistory){

        appData.savingsHistory = [];

    }



    syncCompletedGoals();


    updateDashboard();



}

);







// ------------------------------
// Make Functions Available
// ------------------------------

window.updateDashboard =
updateDashboard;


window.updateFeaturedGoal =
updateFeaturedGoal;


window.updateSavingsBreakdown =
updateSavingsBreakdown;


window.refreshDashboard =
refreshDashboard;
