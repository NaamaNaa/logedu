/**
 * Created by Mahmoud on 10/06/2017.
 */


$(document).ready(function() {

    formData = {
        userId : 1
    }


    getUserGrades(formData)









})

function getUserGrades( formData){
    $.ajax({
        url: '/user/grades',
        type: 'GET',
        data: {formData: formData},
        success: function (data) {
            dataProvider = []

            data.userGradesResult.rows.sort(function compareGrade(a,b) {
                if (a.exerciceId < b.exerciceId)
                    return -1;
                return 1;
            })
            console.log(data.userGradesResult.rows)

            for (var i = 0 ; i< data.userGradesResult.count ; i++) {
                row = data.userGradesResult.rows[i]

                color ='#40FF00' // green
                if(row.grade<10) {
                    color ='#FF0000' // red
                }
                else if(row.grade < 14){
                    color = '#FFBF00' // orange
                }
                else if(row.grade < 17) {
                    color = '#0ea529' // greeen --
                } // cold green

                dataProvider.push({
                    "Exercice" : "Exercice : " + row.exerciceId,
                    "Note" : row.grade,
                    "color" : color
                })
            }

            graphInit(dataProvider)


        }
    })
}



function graphInit(dataProvider){
    var chart = AmCharts.makeChart("chartdiv", {
        "theme": "none",
        "titles": [
            {
                "text": "Notes",
                "size": 15
            }],
        "type": "serial",
        "startDuration": 2,
        "dataProvider": dataProvider,
        "valueAxes": [{
            "position": "left",
            "title": "Notes",
            "minimum" : 0,
            "maximum" : 20,


        }],
        "graphs": [{
            "balloonText": "[[category]]: <b>[[value]]</b>",
            "fillColorsField": "color",
            "fillAlphas": 1,
            "lineAlpha": 0.1,
            "type": "column",
            "valueField": "Note",

        }],
        "depth3D": 20,
        "angle": 30,
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "Exercice",
        "categoryAxis": {
            "gridPosition": "start",
            "labelRotation": 90
        },
        "export": {
            "enabled": true
        }

    });
}