/**
 * Created by Mahmoud on 04/06/2017.
 */






$(document).ready(function () {
    // globals

    exercice = []
    note = 20


    // init exercice tab
    exerciceInit(data.questions, data.responses)
    console.log(exercice)


    // animation
    $(".parallax-container").animate({height: 0}, 2000);


    $("#checkBtn").click(function (event) {
        event.preventDefault()


        var trueAnswer = 0
        var falseAnswer  = 0

        $("input[type=text]").each(function () {

            if ($(this).attr('data-questionid')) {


                if ($(this).val() == "") {
                    $(this).css('color', 'black')
                }


                else {
                    if ($(this).val() == exercice[$(this).attr('data-questionid')].responses[0].response) {
                        $(this).css('color', 'green')
                        trueAnswer++
                    }

                    else {
                        $(this).css('color', 'red')
                        falseAnswer++
                        note --
                        console.log(note)
                    }
                }


            }


        })

        if(trueAnswer == exercice.length) {
            Materialize.toast("Bravoo!", 4000, 'green')
        }
        else {
            var i = exercice.length-trueAnswer
            if(i== 1) Materialize.toast( i +" mauvaise réponse ! ", 4000, 'red')
            else Materialize.toast( i +" mauvaises réponses   ! ", 4000, 'red')

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

});