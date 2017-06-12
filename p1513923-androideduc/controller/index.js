var express = require('express');
var router = express.Router();
var userTypeModel = require('../models/userType')
var userModel = require('../models/user')
var chapterModel = require('../models/chapter')
var exerciceModel = require('../models/exercice')
var exerciceTypeModel = require('../models/exerciceType')
var responseeModel = require('../models/response')


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Android Educ Application'})
});


router.get('/login', function (req, res) {
    res.render('login')
})

router.get('/inscription', function (req, res) {
    userTypeModel.findAll().then(function (userTypes) {

        res.render('user/add', {userTypes: userTypes});

    })
})


router.get('/formation', function (req, res) {

    formation = []
    chapterModel.findAndCountAll().then(function (chapterResult) {


        for (var i = 0; i < chapterResult.count; i++) {
            formation.push({
                chapter: chapterResult.rows[i],
                exercices: []
            })
        }

    }).then(function () {
        var j = 0
        var finish = false


        exerciceModel.findAndCountAll().then(function (exercicesResult) {

            for (var i = 0; i < exercicesResult.count; i++) {
                indexFormation = exercicesResult.rows[i].chapterId - 1
                formation[indexFormation].exercices.push(exercicesResult.rows[i])
            }

            res.render('chapter/chapters',{formation: formation})


        })


    })


    //res.render('chapter/chapters');


})


router.get('/students', function (req, res) {

    userModel.findAll({
        where: {
            userTypeId: 7, // students
        }
    }).then(function (students) {
        res.render('student/students', {students: students});
    })


})


router.get('/course', function (req, res) {


    res.render('course/courses');


})


router.get('test2', function (req, res) {
    var num = req.params.num
    res.render("chapter/chapter" + num + '/chapter' + num);

})


router.get('/test', function (req, res) {
    var numChapter = req.params.numchapter
    var numExercice = req.params.numexercice
    res.render("chapter/chapter" + numChapter + '/exercices/exercice' + numExercice);

})


module.exports = router;
