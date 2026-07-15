// ======================================
// Money Saver Pro v1.1
// Goals Manager
// ======================================

let selectedImage = "";


// ----------------------
// Create Goal
// ----------------------

function createGoal() {

    const name = document.getElementById("goalName").value.trim();

    const amount = Number(document.getElementById("goalAmount").value);

    const category = document.getElementById("goalCategory").value;

    if (!name) {

        alert("Please enter a goal name.");

        return;

    }

    if (amount <= 0) {

        alert("Please enter a valid goal amount.");

        return;

    }

    const goal = {

        id: Date.now(),

        name,

        amount,

        saved: 0,

        category,

        image: selectedImage || "",

        created: Date.now()

    };

    appData.goals.push(goal);

    addActivity(`🎯 Created goal "${goal.name}"`);

    saveData();

    clearGoalForm();

    renderGoals();

    refreshDashboard();

}



// ----------------------
// Clear Goal Form
// ----------------------

function clearGoalForm() {

    document.getElementById("goalName").value = "";

    document.getElementById("goalAmount").value = "";

    document.getElementById("imageSearch").value = "";

    document.getElementById("imageResults").innerHTML = "";

    selectedImage = "";

}



// ----------------------
// Refresh Dashboard
// ----------------------

function refreshDashboard() {

    if (typeof updateDashboard === "function") {

        updateDashboard();

    }

    if (typeof updateFeaturedGoal === "function") {

        updateFeaturedGoal();

    }

}



// ----------------------
// Recent Activity
// ----------------------

function addActivity(text) {

    appData.activity.unshift({

        text,

        date: new Date().toLocaleString()

    });

    appData.activity = appData.activity.slice(0, 20);

}



// ----------------------
// Savings History
// ----------------------

function addSavingsHistory(goalName, amount) {

    if (!appData.savingsHistory) {

        appData.savingsHistory = [];

    }

    appData.savingsHistory.push({

        goal: goalName,

        amount,

        date: Date.now()

    });

}

// ----------------------
// Render Goals
// ----------------------

function renderGoals() {

    const container = document.getElementById("goalContainer");

    if (!container) return;

    if (appData.goals.length === 0) {

        container.innerHTML = `
            <div class="card">
                <h2>No Goals Yet</h2>
                <p>Create your first savings goal!</p>
            </div>
        `;

        return;

    }

    container.innerHTML = "";

    appData.goals.forEach(goal => {

        const percent = Math.min(
            (goal.saved / goal.amount) * 100,
            100
        );

        const remaining = Math.max(
            goal.amount - goal.saved,
            0
        );

        container.innerHTML += `

<div class="card goal-card">

    <img
        src="${goal.image || "images/default-goal.png"}"
        alt="${goal.name}">

    <div class="goal-info">

        <h2>${goal.name}</h2>

        <p>${goal.category}</p>

        <p>

            <strong>$${goal.saved.toFixed(2)}</strong>

            / $${goal.amount.toFixed(2)}

        </p>

        <p>

            Remaining:

            <strong>$${remaining.toFixed(2)}</strong>

        </p>

        <div class="progress">

            <div
                class="progress-fill"
                style="width:${percent}%;">
            </div>

        </div>

        <p>${percent.toFixed(0)}%</p>

        <div class="goal-buttons">

            <button onclick="addMoneyToGoal(${goal.id})">
                ➕ Add
            </button>

            <button onclick="subtractMoneyFromGoal(${goal.id})">
                ➖ Subtract
            </button>

            <button onclick="editGoal(${goal.id})">
                ✏️ Edit
            </button>

            <button onclick="deleteGoal(${goal.id})">
                🗑 Delete
            </button>

        </div>

    </div>

</div>

`;

    });

}



// ----------------------
// Add Money
// ----------------------

function addMoneyToGoal(id) {

    const amount = Number(
        prompt("How much money would you like to add?")
    );

    if (isNaN(amount) || amount <= 0) return;

    const goal = appData.goals.find(g => g.id === id);

    if (!goal) return;

    goal.saved += amount;

    appData.totalSaved += amount;

    addActivity(`💰 Added $${amount.toFixed(2)} to "${goal.name}"`);

    addSavingsHistory(goal.name, amount);

    if (goal.saved >= goal.amount) {

        alert(`🎉 Congratulations!\n\nYou reached "${goal.name}"!`);

    }

    saveData();

    renderGoals();

    refreshDashboard();

}



// ----------------------
// Subtract Money
// ----------------------

function subtractMoneyFromGoal(id) {

    const amount = Number(
        prompt("How much would you like to subtract?")
    );

    if (isNaN(amount) || amount <= 0) return;

    const goal = appData.goals.find(g => g.id === id);

    if (!goal) return;

    goal.saved = Math.max(goal.saved - amount, 0);

    appData.totalSaved = Math.max(
        appData.totalSaved - amount,
        0
    );

    addActivity(`➖ Removed $${amount.toFixed(2)} from "${goal.name}"`);

    saveData();

    renderGoals();

    refreshDashboard();

}



// ----------------------
// Edit Goal
// ----------------------

function editGoal(id) {

    const goal = appData.goals.find(g => g.id === id);

    if (!goal) return;

    const newName = prompt(
        "Goal Name:",
        goal.name
    );

    if (newName === null) return;

    const newAmount = Number(
        prompt(
            "Goal Amount:",
            goal.amount
        )
    );

    if (isNaN(newAmount) || newAmount <= 0) return;

    goal.name = newName.trim();

    goal.amount = newAmount;

    addActivity(`✏️ Updated "${goal.name}"`);

    saveData();

    renderGoals();

    refreshDashboard();

}



// ----------------------
// Delete Goal
// ----------------------

function deleteGoal(id) {

    const goal = appData.goals.find(g => g.id === id);

    if (!goal) return;

    if (!confirm(`Delete "${goal.name}"?`)) return;

    appData.goals = appData.goals.filter(
        g => g.id !== id
    );

    addActivity(`🗑 Deleted "${goal.name}"`);

    saveData();

    renderGoals();

    refreshDashboard();

}

// ----------------------
// Sort Goals
// ----------------------

function sortGoals() {

    if (!appData.goals) return;


    appData.goals.sort((a, b) => {

        const aProgress =
            a.saved / a.amount;

        const bProgress =
            b.saved / b.amount;


        return bProgress - aProgress;

    });

}



// ----------------------
// Get Featured Goal
// ----------------------

function getFeaturedGoal() {

    if (!appData.goals || appData.goals.length === 0) {

        return null;

    }


    sortGoals();


    return appData.goals[0];

}



// ----------------------
// Complete Goal Check
// ----------------------

function checkCompletedGoals() {


    appData.goals.forEach(goal => {


        if (
            goal.saved >= goal.amount &&
            !goal.completed
        ) {


            goal.completed = true;


            addActivity(
                `🏆 Completed "${goal.name}"`
            );


        }


    });


}



// ----------------------
// Goal Count Update
// ----------------------

function updateGoalCount() {


    const count =
        document.getElementById("goalCount");


    if (count) {

        count.textContent =
            appData.goals.length;

    }


}



// ----------------------
// Initialize Goals
// ----------------------

document.addEventListener(
"DOMContentLoaded",
() => {


    if (!appData.goals) {

        appData.goals = [];

    }


    sortGoals();


    renderGoals();


    checkCompletedGoals();


    updateGoalCount();


    saveData();


});
