// ======================================
// Money Saver Pro v1.1
// Statistics System
// ======================================


let savingsChart = null;
let historyChart = null;



// ------------------------------
// Load Statistics
// ------------------------------

function loadStatistics(){


    const canvas =
        document.getElementById("chart");



    if(!canvas) return;



    if(typeof Chart === "undefined"){

        console.log(
            "Chart.js not loaded"
        );

        return;

    }



    if(!appData){

        console.log(
            "No app data"
        );

        return;

    }



    createGoalChart(canvas);


    createHistoryChart();


    updateStatsNumbers();


}





// ------------------------------
// Goal Savings Chart
// ------------------------------

function createGoalChart(canvas){



    const goals =
        appData.goals || [];



    const labels =
        goals.map(
            goal => goal.name
        );



    const values =
        goals.map(
            goal => goal.saved
        );



    if(savingsChart){

        savingsChart.destroy();

    }




    savingsChart = new Chart(
        canvas,
        {

        type:"bar",


        data:{


            labels,


            datasets:[

                {

                    label:
                    "Saved ($)",


                    data:values

                }

            ]


        },


        options:{


            responsive:true,


            scales:{


                y:{


                    beginAtZero:true


                }


            }


        }


    });



}







// ------------------------------
// Savings History Chart
// ------------------------------

function createHistoryChart(){



    const historyCanvas =
        document.getElementById(
            "historyChart"
        );



    if(!historyCanvas) return;




    const history =
        appData.savingsHistory || [];



    const labels =
        history.map(item =>

            new Date(item.date)
            .toLocaleDateString()

        );



    const values =
        history.map(
            item => item.amount
        );





    if(historyChart){

        historyChart.destroy();

    }




    historyChart =
    new Chart(

        historyCanvas,

        {


        type:"line",


        data:{


            labels,


            datasets:[


                {


                label:
                "Savings Progress ($)",


                data:values,


                tension:.3


                }


            ]


        },


        options:{


            responsive:true,


            scales:{


                y:{


                beginAtZero:true


                }


            }


        }



    });


}





// ------------------------------
// Statistics Numbers
// ------------------------------

function updateStatsNumbers(){



    const total =
        appData.totalSaved || 0;



    const goals =
        appData.goals || [];



    const completed =
        goals.filter(goal =>
            goal.completed
        ).length;



    const average =
        goals.length > 0 ?
        total / goals.length :
        0;




    const totalElement =
        document.getElementById(
            "statsTotal"
        );


    const completedElement =
        document.getElementById(
            "statsCompleted"
        );


    const averageElement =
        document.getElementById(
            "statsAverage"
        );



    if(totalElement){

        totalElement.textContent =
        "$" + total.toFixed(2);

    }



    if(completedElement){

        completedElement.textContent =
        completed;

    }



    if(averageElement){

        averageElement.textContent =
        "$" + average.toFixed(2);

    }


}







// ------------------------------
// Refresh When Opening Stats
// ------------------------------

window.showStatistics = function(){


    setTimeout(

        loadStatistics,

        200

    );


};







// ------------------------------
// Start
// ------------------------------

document.addEventListener(

"DOMContentLoaded",

()=>{


    loadStatistics();


}

);
