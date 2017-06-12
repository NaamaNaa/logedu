$(document).ready(function () {

    // Globals
    exercice = []
    note = 20




    // init exercice Tab
    exerciceInit(data.questions, data.responses)
    console.log(exercice)


    // shuffle

    shuffledExercice = exercice.slice()

    shuffle(shuffledExercice)
    console.log(shuffledExercice)

    // insert in dom

    for (var i = 0; i < shuffledExercice.length; i++) {

        for (var j = 0; j < shuffledExercice[i].responses.length; j++) {

            $("#responses").append("<li data-questionid=" + shuffledExercice[i].responses[j].questionId + " class='ui-state-default'>" + shuffledExercice[i].responses[j].response + "</li>")
        }

    }


    // animation
    $(".parallax-container").animate({height: 0}, 2000);

    $(function () {
        $("ul.droptrue").sortable({
            connectWith: "ul"
        });

        $("ul.dropfalse").sortable({
            connectWith: "ul",
            dropOnEmpty: false
        });

        $(".sortable").disableSelection();
        $("#responses").disableSelection();


        $("#checkBtn").click(function (event) {
            event.preventDefault()
            var trueAnswer, untreatedAnswer = 0
            var falseAnswer = 0
            $(".ui-state-default").each(function () {
                //console.log($(this).attr('data-questionid'))
                //console.log($(parent).attr('id'))

                var parent = $(this).parent()

                if ($(parent).attr('id') == "responses") {
                    untreatedAnswer++
                }
                else {
                    if ($(parent).attr('data-questionid') == $(this).attr('data-questionid')) {

                        $(this).css('borderColor', 'green')
                        if ($(this).css('borderColor') == 'green') {
                            trueAnswer++
                        }
                    }
                    else {
                        $(this).css('borderColor', 'red')
                        falseAnswer++
                        if(note >= 5) note --
                        console.log(note)
                    }
                }


            })
            if (falseAnswer == 0 && untreatedAnswer ==0) {
                Materialize.toast("Bravoo!", 4000, 'green')

            }
            else  {
                Materialize.toast("Nombre d'erreur : " + falseAnswer, 4000, 'red')
            }

            if(untreatedAnswer != 0) {
                Materialize.toast("il vous reste  " + untreatedAnswer +" réponses", 4000, 'blue')
            }


        })
    });



    $("#validBtn").click(function(event){
        event.preventDefault()
        formData = {
            grade : note,
            userId : 1,
            exerciceId:data.exercice.id
        }

        persistUserGrade(formData)

    })





})

function persistUserGrade(formData) {
    $.ajax({
        url: '/formation/chapitre/' + data.chapter.id + '/exercice/grade/persist',
        type: 'POST',
        data: {formData: formData},
        success: function (data) {
            Materialize.toast( data.notif, 4000, 'green' , function(){
               // window.location.href = '/formation/'
            })
        }
    })
}