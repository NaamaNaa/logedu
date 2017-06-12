/**
 * Created by Mahmoud on 29/05/2017.
 */
/**
 * Created by Mahmoud on 04/05/2017.
 */



$(document).ready(function() {

    console.log('numChapter : '+ numChapter)
    //select
    $('#exerciceType').material_select();
    $('#nbQuestions').material_select();
    //scroll animation
    $(".parallax-container").animate({height:0},2000);


    $("#nextBtn").click(function(event){
        event.preventDefault()



        formData = {
            numChapter : numChapter,
            statement : $("#statement").val(),
            nbQuestions : $("#nbQuestions").val(),
            exerciceType : $("#exerciceType").val(),

        }


        $.ajax({
            url : '/formation/chapitre/'+numChapter+'/exercice/add',
            type : 'POST',
            data: {formData : formData },
            success : function(data){

                    window.location = window.location.href =
                        '/formation/chapitre/'+data.numChapter+'/exercice/add/'+data.exerciceTypeName+'/'+data.idExercice+'/'+data.nbQuestions;
            }
        });





    })



});