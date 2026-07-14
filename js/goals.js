// ===============================
// Goals
// ===============================

function createGoal() {

    const name =
        document.getElementById("goalName").value.trim();

    const amount =
        Number(document.getElementById("goalAmount").value);

    const category =
        document.getElementById("goalCategory").value;

    if (!name || amount <= 0) {

        alert("Please enter a goal name and amount.");

        return;

    }

    appData.goals.push({

        id: Date.now(),

        name,

        amount,

        saved: 0,

        category,

        image: selectedImage || ""

    });

    saveData();

    renderGoals();

    if (typeof updateDashboard === "function") {

        updateDashboard();

    }

    document.getElementById("goalName").value = "";
    document.getElementById("goalAmount").value = "";
    document.getElementById("imageSearch").value = "";
    document.getElementById("imageResults").innerHTML = "";

    selectedImage = "";

}

function renderGoals() {

    const container =
        document.getElementById("goalContainer");

    if (!container) return;

    if (appData.goals.length === 0) {

        container.innerHTML =
            "<p>No goals yet. Create your first one!</p>";

        return;

    }

    container.innerHTML = "";

    appData.goals.forEach(goal => {

        const percent =
            Math.min((goal.saved / goal.amount) * 100, 100);

        container.innerHTML += `

<div class="card goal-card">

    <img src="${goal.image || 'images/default-goal.png'}">

    <div style="flex:1;">

        <h2>${goal.name}</h2>

        <p>${goal.category}</p>

        <p>$${goal.saved.toFixed(2)} / $${goal.amount.toFixed(2)}</p>

        <div class="progress">
            <div
                class="progress-fill"
                style="width:${percent}%;">
            </div>
        </div>

        <br>
        <button onclick="addMoneyToGoal(${goal.id})">
            ➕ Add Money
        </button>

        <button onclick="deleteGoal(${goal.id})">
            🗑 Delete
        </button>

    </div>

</div>

`;

    });

}

function addMoneyToGoal(id) {

    const amount =
        Number(prompt("How much money would you like to add?"));

    if (!amount || amount <= 0) return;

    const goal =
        appData.goals.find(g => g.id === id);

    if (!goal) return;

    goal.saved += amount;
    appData.totalSaved += amount;

    saveData();

    renderGoals();

    if (typeof updateDashboard === "function") {

    updateDashboard();

}

if (typeof updateFeaturedGoal === "function") {

    updateFeaturedGoal();

}

}

if (typeof updateFeaturedGoal === "function") {

    updateFeaturedGoal();

}


function deleteGoal(id) {

    if (!confirm("Delete this goal?")) return;

    appData.goals =
        appData.goals.filter(g => g.id !== id);

    saveData();

    renderGoals();

    if (typeof updateDashboard === "function") {

    updateDashboard();

}

if (typeof updateFeaturedGoal === "function") {

    updateFeaturedGoal();

}

}

document.addEventListener("DOMContentLoaded", renderGoals);