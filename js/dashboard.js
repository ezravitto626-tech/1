function updateFeaturedGoal(){

    const container =
        document.getElementById("featuredGoal");

    if(!container) return;

    if(appData.goals.length === 0){

        container.innerHTML =
        "🎯 Create your first goal to see it here.";

        return;

    }



    let bestGoal = appData.goals[0];


    appData.goals.forEach(goal=>{

        if(
            (goal.saved / goal.amount) >
            (bestGoal.saved / bestGoal.amount)
        ){

            bestGoal = goal;

        }

    });


    const percent =
        Math.min(
            (bestGoal.saved / bestGoal.amount) * 100,
            100
        );


    container.innerHTML = `

    <div class="featured-card">

        <img src="${
            bestGoal.image ||
            "images/default-goal.png"
        }">

        <div class="featured-info">

            <h2>${bestGoal.name}</h2>

            <p>${bestGoal.category}</p>

            <br>

            <div class="progress">

                <div
                class="progress-fill"
                style="width:${percent}%;">
                </div>

            </div>

            <br>

            <p>
                $${bestGoal.saved.toFixed(2)}
                /
                $${bestGoal.amount.toFixed(2)}
            </p>

            <br>

        </div>

    </div>

    `;

}

function updateSavingsBreakdown(){

    const box =
        document.getElementById("savingBreakdown");


    if(!box) return;


    if(!appData.goals || appData.goals.length === 0){

        box.innerHTML =
            "No savings yet.";

        return;

    }


    box.innerHTML = "";


    appData.goals.forEach(goal => {


        if(goal.saved > 0){

            box.innerHTML += `

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


    if(box.innerHTML === ""){

        box.innerHTML =
            "No savings yet.";

    }

}

function updateDashboard(){


    document.getElementById("totalSaved").textContent =
        appData.totalSaved.toFixed(2);


    document.getElementById("goalCount").textContent =
        appData.goals.length;


    document.getElementById("streak").textContent =
        appData.streak;


    let badges = 0;


    if(appData.totalSaved >= 100)
        badges++;


    if(appData.goals.length >= 5)
        badges++;


    document.getElementById("badgeCount").textContent =
        badges;

updateSavingsBreakdown();
    updateFeaturedGoal();

}



document.addEventListener(
    "DOMContentLoaded",
    updateDashboard
);

window.addMoney = function(){

    let amount = prompt(
        "How much money did you save?"
    );


    if(!amount) return;


    amount = Number(amount);


    if(isNaN(amount) || amount <= 0){

        alert("Please enter a valid amount.");

        return;

    }


    appData.totalSaved += amount;


    saveData();


    updateDashboard();


    alert(
        "Added $" + amount.toFixed(2) + " to savings!"
    );

};

window.manageTotalSaved = function(){

    let choice = prompt(
`Manage Total Saved:

1 = Subtract Money
2 = Reset Total Saved

Enter option:`
    );


    if(choice === "1"){


        let amount = Number(
            prompt("How much would you like to subtract?")
        );


        if(!amount || amount <= 0){

            return;

        }


        appData.totalSaved -= amount;


        if(appData.totalSaved < 0){

            appData.totalSaved = 0;

        }


        saveData();

        updateDashboard();


        alert(
            "Removed $" + amount.toFixed(2)
        );


    }


    else if(choice === "2"){


        let confirmReset =
            confirm(
            "Are you sure you want to reset total savings?"
            );


        if(confirmReset){

            appData.totalSaved = 0;


            appData.goals.forEach(goal=>{

                goal.saved = 0;

            });


            saveData();

            updateDashboard();


            alert(
            "Savings reset."
            );

        }

    }

};

window.openSavingsMenu = function(){

    document.getElementById(
        "savingsMenu"
    ).style.display = "flex";

};



window.closeSavingsMenu = function(){

    document.getElementById(
        "savingsMenu"
    ).style.display = "none";

};



window.subtractSavings = function(){

    let amount =
        Number(
        prompt(
        "How much do you want to subtract?"
        )
        );


    if(!amount || amount <= 0)
        return;


    appData.totalSaved -= amount;


    if(appData.totalSaved < 0){

        appData.totalSaved = 0;

    }


    saveData();

    updateDashboard();


    closeSavingsMenu();

};



window.resetSavings = function(){

    let confirmReset =
        confirm(
        "Reset all savings?"
        );


    if(!confirmReset)
        return;



    appData.totalSaved = 0;


    appData.goals.forEach(goal=>{

        goal.saved = 0;

    });



    saveData();

    updateDashboard();


    closeSavingsMenu();

};