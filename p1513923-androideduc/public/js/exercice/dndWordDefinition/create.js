$(document).ready(function () {


    //Global Variables
    questionsTab = []
    // animation
    $(".parallax-container").animate({height: 0}, 2000);
    $('.modal').modal();


    $("#createBtn").click(function (event) {
        event.preventDefault()

        formData = {
            idExercice: idExercice
        }

        formData.questions = []
        formData.nbResponses = []
        for (i = 0; i < nbQuestions; i++) {
            //console.log('Question : ' + $("#question"+(i+1)).val() + ' Response : ' + $("#response"+(i+1)).val())
            formData.questions.push($("#question" + (i + 1)).val())
            formData.nbResponses.push($("#nbResponses" + (i + 1)).val())
        }


        console.log(formData)
        persistQuestions(formData)


    })


    function persistQuestions(formData) {
        console.log(formData)
        $.ajax({
            url: '/formation/chapitre/' + numChapter + '/exercice/questions/persist',
            type: 'POST',
            data: {formData: formData},
            success: function (data) {


                questionsTab = data.questionsTab
                data.questionsTab.forEach(function (item) {
                    $("#formContent").append("<h7>Pour le mot  :  " + item.question.statement + " </h7>")
                    for (i = 0; i < item.nbResponses; i++) {
                        $("#formContent").append("<div class=input-field col s6> <input data-wordNumber=" + (i + 1) + " data-idQuestion=" +
                            item.question.id +
                            " id=last_name type=text class=validate><label for=last_name>Mot " + (i + 1) + "</label></div>")

                    }
                })
                //$("#formContent").append()


                $('#modal1').modal('open')

            }
        });
    }


    $("#saveBtn").click(function (event) {
        event.preventDefault()


        formData = []


        questionsTab.forEach(function (item) {
            console.log('for ' + item.question.statement)
            responses = []

            for (i = 1; i <= item.nbResponses; i++) {

                responses.push($("input[data-idQuestion=" + item.question.id + "][data-wordNumber=" + i + "]").val())
                //console.log($("input[data-idQuestion="+item.question.id+"][data-wordNumber="+i+"]").val() )
            }


             formData.push({
             question : item.question,
             nbResponses : item.nbResponses,
             responses : responses
             })


        })


        console.log(formData)


        persistResponses(formData)


    })


    function persistResponses(formData) {
        console.log(formData)
        $.ajax({
            url: '/formation/chapitre/' + numChapter + '/exercice/responses/persist',
            type: 'POST',
            data: {formData: formData},
            success: function (data) {
                Materialize.toast( data.notif, 4000, 'green' , function(){
                    window.location.href = '/formation/'
                })
            }
        });
    }


});