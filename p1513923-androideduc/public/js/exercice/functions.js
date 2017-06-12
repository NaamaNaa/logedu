/**
 * Created by Mahmoud on 08/06/2017.
 */

function exerciceInit(questionsTab , answersTab){
    var i =0
    questionsTab.forEach(function (question) {
        exercice.push({
            question : question,
            responses :[]
        })
        answersTab.forEach(function (answers) {

            answers.forEach(function (response) {
                if(response.questionId == question.id) {
                    exercice[i].responses.push(response)
                }
            })


        })
        i++
    })
}


function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }


}