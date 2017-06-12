/**
 * Created by Mahmoud on 23/05/2017.
 */
var express = require('express');
var router = express.Router();
var async = require('async');
var exerciceTypeModel = require('../models/exerciceType')
var exerciceModel = require('../models/exercice')
var questionModel = require('../models/question')
var responseModel = require('../models/response')
var chapterModel = require('../models/chapter')
var userGradeModel = require('../models/userGrades')
var await = require('asyncawait/await')


router.get('/:numChapter', function (req, res) {

    var numChapter = req.params.numChapter
    if (numChapter == 'add') {
        res.render("chapter/add")
    }
    else {
        res.render("chapter/chapter" + numChapter + '/chapter' + numChapter)
    }

})



router.get('/:numChapter/fillblank' , function (req,res){
    res.render("exercice/fillBlank/show")
})

router.get('/:numChapter/exercice/:numExercice', function (req, res) {


    var numChapter = req.params.numChapter
    var numExercice = req.params.numExercice








     if (numExercice == 'add') {

        console.log("add")

        exerciceTypeModel.findAll().then(function (exerciceTypes) {

            res.render('exercice/add', {numChapter: numChapter, exerciceTypes: exerciceTypes})
        })

    }
     else {




        console.log("else")
        chapterModel.findById(numChapter).then(function (chapter) {
            console.log('chapter id : ' + chapter.id)

            exerciceModel.findById(numExercice).then(function (exercice) {

                console.log('exercice id : ' + exercice.id)
                console.log('exercice type  id : ' + exercice.exerciceTypeId)

                exerciceTypeModel.findById(exercice.exerciceTypeId).then(function (exerciceType) {
                    console.log('exercice type id et name  : ' + exerciceType.id + ' ' + exerciceType.name)
                    questionModel.findAndCountAll({where: {exerciceId: exercice.id}}).then(function (questionsResult) {


                        data = {
                            chapter: chapter,
                            exercice: exercice,
                            nbQuestions: questionsResult.count,
                            questions: questionsResult.rows,
                            responses: []
                        }


                        var j = 0;
                        data.questions.forEach(function (question) {
                            console.log(question.statement)
                            responseModel.findAndCountAll({where: {questionId: question.id}}).then(function (responses) {
                                responses.rows.forEach(function (item) {
                                })
                                data.responses.push(responses.rows)
                                j++
                                if (j == questionsResult.count) {
                                    data.responses.forEach(function (response) {
                                        response.forEach(function (item) {
                                            console.log("question : " + item.questionId + " and response : " + item.response)

                                        })
                                    })

                                    console.log('sendiing response')
                                    console.log(data)
                                    res.render('exercice/' + exerciceType.name + '/show', {data: data})

                                }
                            })


                        })


                    })
                })

            })

        })


    }
})


router.post('/:numChapter/exercice/:numExercice', function (req, res) {

    var numChapter = req.params.numChapter
    var numExercice = req.params.numExercice


    if (numExercice == 'add' && req.body.formData != undefined) {

        console.log(req.body.formData)
        formData = req.body.formData


        exerciceTypeModel.findById(formData.exerciceType).then(function (exerciceType) {

            exerciceModel.create({
                statement: formData.statement,
                exerciceTypeId: exerciceType.id,
                nbQuestions: formData.nbQuestions,
                chapterId: formData.numChapter
            }).then(function (created) {
                console.log(' a New Exercice Created : ' + created)
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    exerciceTypeName: exerciceType.name,
                    numChapter: numChapter,
                    nbQuestions: formData.nbQuestions,
                    idExercice: created.id
                }));
            })


        })

    }


})


// form view for each exercice type
router.get('/:numChapter/exercice/add/:exerciceTypeName/:idExercice/:nbQuestions', function (req, res) {
    res.render('exercice/' + req.params.exerciceTypeName + '/add', {
        numChapter: req.params.numChapter,
        nbQuestions: req.params.nbQuestions,
        idExercice: req.params.idExercice
    })
})


// persist exercice directQuestion
router.post('/:numChapter/exercice/questions/persist', function (req, res) {


    sent = false

    formData = req.body.formData


    exerciceModel.findById(formData.idExercice).then(function (exercice) {


        exerciceTypeModel.findById(exercice.exerciceTypeId).then(function (exerciceType) {


            switch (exerciceType.name) {
                case "directQuestion" :
                    questions = []
                    responses = []


                    j = 0

                    for (var i = 0; i < formData.questions.length; i++) {

                        questionModel.create({
                            statement: formData.questions[i],
                            nbResponses: 0,
                            exerciceId: formData.idExercice
                        }).then(function (created) {
                            console.log("Question added  !! ")
                            responseModel.create({
                                    response: formData.responses[j],
                                    questionId: created.id
                                }
                            ).then(function () {
                                console.log('Response added !')

                            })
                            j++

                        })


                    }


                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({notif: "Exercice Ajouté avec succès ! "}));
                    break;
                //drag and drop : Word definition
                case "dndWordDefinition" :

                    questionsTab = []
                    j = 0

                    console.log(formData.questions.length)
                    for (i = 0; i < formData.questions.length; i++) {

                        console.log('hello')
                        questionModel.create({
                            statement: formData.questions[i],
                            nbResponses: 0,
                            exerciceId: formData.idExercice
                        }).then(function (created) {
                            questionsTab.push({
                                question: created,
                                nbResponses: formData.nbResponses[j]
                            })
                            j++
                            if (j == formData.questions.length) {
                                res.setHeader('Content-Type', 'application/json');
                                res.send(JSON.stringify({questionsTab: questionsTab}));
                            }

                        })
                    }


                    break;

                // Drag and drop : Order Instructions
                case "dndOrder" :

                    questions = []
                    responses = []


                    j = 0

                    for (var i = 0; i < formData.questions.length; i++) {

                        questionModel.create({
                            statement: formData.questions[i],
                            exerciceId: formData.idExercice
                        }).then(function (created) {
                            console.log("line of code added")
                        })


                    }


                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({notif: "Exercice Ajouté avec succès ! "}));
                    break;
                case "fillBlank" :

            }


        })


    })


})


// persist exercice directQuestion
router.post('/:numChapter/exercice/responses/persist', function (req, res) {

    formData = req.body.formData

    formData.forEach(function (item) {

        for (i = 0; i < item.nbResponses; i++) {
            responseModel.create({
                questionId: item.question.id,
                response: item.responses[i]
            }).then(function (created) {
                console.log('response added!')
                questionModel.findById(created.questionId).then(function (question) {
                    question.nbResponses++;
                    question.save().then(function () {
                        console.log('increm nb responses')
                    })
                })
            })
        }
    })


    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({'notif': 'Exercice ajouté avec succès ! '}));

})


router.post("/:chapterId/exercice/grade/persist", function (req, res) {

    numChapter = req.params.chapterId
    exerciceId = req.body.formData.exerciceId
    userId = req.body.formData.userId
    grade = req.body.formData.grade


    userGradeModel.create({userId: userId, exerciceId: exerciceId, grade: grade}).then(function (created) {
        console.log("grade has been added")
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({'notif': " Note  : " + created.grade + " /20 "}));
    })


})

//router.post("/persist",function(req,res))
//{

//}

module.exports = router