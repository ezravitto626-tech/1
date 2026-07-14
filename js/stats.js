// Money Saver Pro Statistics

let savingsChart = null;


function loadStatistics(){


    const canvas = document.getElementById("chart");


    if(!canvas) return;


    if(typeof Chart === "undefined"){

        console.log("Chart.js not loaded");

        return;

    }


    if(!appData || !appData.goals){

        console.log("No savings data found");

        return;

    }



    const labels =
        appData.goals.map(goal => goal.name);



    const saved =
        appData.goals.map(goal => goal.saved);



    if(savingsChart){

        savingsChart.destroy();

    }



    savingsChart = new Chart(canvas, {

        type: "bar",

        data: {

            labels: labels,

            datasets: [

                {

                    label: "Money Saved ($)",

                    data: saved

                }

            ]

        },


        options: {

            responsive: true,

            scales: {

                y: {

                    beginAtZero:true

                }

            }

        }

    });


}



// Reload chart when opening Statistics

window.showStatistics = function(){

    setTimeout(
        loadStatistics,
        200
    );

};



document.addEventListener(
"DOMContentLoaded",
loadStatistics
);