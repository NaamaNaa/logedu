var express = require('express');
var router = express.Router();
var model = require('../models/user')
var userTypeModel = require('../models/userType')
var userGradeModel = require('../models/userGrades')


/* GET user listing. */
router.get('/', function (req, res, next) {


    /*
     var newUser = {
     email:'test',
     password: 'test',
     nom: 'nom',
     prenom :'prenom'
     }
     */


    res.send('lol')
});


// renvoie le formulaire
router.get('/add', function (req, res) {


    userTypeModel.findAll().then(function (userTypes) {

        res.render('user/add', {userTypes: userTypes});

    })


})


router.get('/profile' , function (req,res) {
    res.render('user/profile')
})


// renvoie le formulaire
router.get('/show/:idUser', function (req, res) {


    model.findOne({id:req.params.idUser}).then(function (user) {
        console.log(user.g)
        res.send('ok')
    })


})



// Add in dataBase
router.post('/persist', function (req, res) {
    formData = req.body.formData


    userTypeModel.findOne({'id': formData.typeuser}).then(function (typeUser) {
        model.create({
            firstName: formData.firstName,
            lastName: formData.lastName,
            userTypeId: typeUser.id,
            email: formData.email,
            password: formData.password
        }).then(function (created) {
            console.log(created.userTypeId)

        })
        res.send('ok')
    })

})

// formulaire d'edit
router.get('/edit', function (req, res) {
    res.render('user/edit')
})

router.get('/grades' , function(req , res){

    userId = req.body.userId

    console.log(userId)

    userGradeModel.findAndCountAll({userId : userId}).then(function (userGradesResult){

        console.log(userGradesResult.count)

        res.setHeader('Content-Type', 'application/json')

        res.send(JSON.stringify({userGradesResult:userGradesResult}))

    })

})


router.get('/:idUser' , function(req,res){
    console.log(req.params.idUser)
    model.find({id : 1}).then(function (user) {
        console.log(user)
        console.log(user.firstName +' ' + user.lastName )
        res.render('user/show' , {user : user})
    })
})


module.exports = router;
