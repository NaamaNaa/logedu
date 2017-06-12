$(document).ready(function() {

    console.log('numChapter : ' + numChapter)

    $(".parallax-container").animate({height: 0}, 2000);

    $("#createBtn").click(function(event){
        event.preventDefault()

        formData = {
            idExercice: idExercice
        }

        formData.questions = []
        for(i=0;i<nbQuestions;i++){
            formData.questions.push($("#question"+(i+1)).val())
        }


        console.log(formData)
        persistQuestions(formData)


    })


    function persistQuestions(formData) {
        console.log(formData)
        $.ajax({
            url : '/formation/chapitre/'+numChapter+'/exercice/questions/persist',
            type : 'POST',
            data: {formData : formData },
            success : function(data){


                Materialize.toast( data.notif, 4000, 'green' , function(){
                    window.location.href = '/formation/'
                })

            }
        });
    }


});