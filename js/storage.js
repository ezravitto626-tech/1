// ===============================
// Money Saver Pro Storage
// ===============================

let appData = JSON.parse(localStorage.getItem("moneySaverData")) || {

    totalSaved: 0,

    goals: [],

    streak: 0,

    activity: []

};

function saveData() {

    localStorage.setItem(

        "moneySaverData",

        JSON.stringify(appData)

    );

}