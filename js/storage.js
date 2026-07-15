// ======================================
// Money Saver Pro v1.1
// Local Storage Manager
// ======================================

const STORAGE_KEY = "moneySaverData";

const DEFAULT_DATA = {

    totalSaved: 0,

    goals: [],

    activity: [],

    savingsHistory: [],

    streak: 0,

    achievements: [],

    family: {

        connected: false,

        name: "",

        code: "",

        members: [],

        savings: 0,

        goals: []

    },

    settings: {

        theme: "dark"

    }

};

let appData = loadData();



// ------------------------------
// Load Data
// ------------------------------

function loadData() {

    try {

        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {

            return structuredClone(DEFAULT_DATA);

        }

        const data = JSON.parse(saved);

        return {

            ...structuredClone(DEFAULT_DATA),

            ...data,

            family: {
                ...structuredClone(DEFAULT_DATA.family),
                ...(data.family || {})
            },

            settings: {
                ...structuredClone(DEFAULT_DATA.settings),
                ...(data.settings || {})
            }

        };

    } catch (error) {

        console.error("Storage load failed:", error);

        return structuredClone(DEFAULT_DATA);

    }

}



// ------------------------------
// Save Data
// ------------------------------

function saveData() {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(appData)

    );

}



// ------------------------------
// Reset All Data
// ------------------------------

function resetAllData() {

    if (!confirm("Delete all Money Saver Pro data?")) return;

    localStorage.removeItem(STORAGE_KEY);

    appData = structuredClone(DEFAULT_DATA);

    saveData();

    location.reload();

}
