$(document).ready(function () {
    // animation
    $(".parallax-container").animate({height: 0}, 2000);


    //global
    exercice = []

    note = 20

    // init exercice tab
    exerciceInit(data.questions, data.responses)
    for (var i = 0; i < exercice.length; i++) {
        exercice[i].responses = i
    }

    // shuffle exercice
    shuffledExercice = exercice.slice()
    shuffle(shuffledExercice)


    // insert in DOM
    for (var i = 0; i < shuffledExercice.length; i++) {
        $("#sortable").append("<li class=ui-state-default><span id=" + shuffledExercice[i].question.id + " class=ui-icon ui-icon-arrowthick-2-n-s></span>" + shuffledExercice[i].question.statement + "</li>")
    }


    $(function () {
        $("#sortable").sortable();
        $("#sortable").disableSelection();
    });


    //Traitement des réponses

    $("#checkBtn").click(function (event) {
        event.preventDefault()

        var list = $("#sortable > li  > span")
        console.log(list)
        console.log(exercice)

        nbError = 0;
        for (var i = 0; i < list.length; i++) {
            if (list[i].id != exercice[i].question.id) {
                $("#" + list[i].id).css('borderColor', 'red')
                nbError++
                note--
                console.log(note)
            }
        }

        if (nbError == 0) {
            Materialize.toast("Bravoo!", 4000, 'green')
        }
        else {

            Materialize.toast("Nombre d'erreur : " + nbError, 4000, 'red')
        }


    })

    $("#validBtn").click(function (event) {
        event.preventDefault()
        formData = {
            grade: note,
            userId: 1,
            exerciceId: data.exercice.id
        }

        persistUserGrade(formData)

    })

    function persistUserGrade(formData) {
        $.ajax({
            url: '/formation/chapitre/' + data.chapter.id + '/exercice/grade/persist',
            type: 'POST',
            data: {formData: formData},
            success: function (data) {
                Materialize.toast(data.notif, 4000, 'green', function () {
                    // window.location.href = '/formation/'
                })
            }
        })
    }

})