var Sequelize = require('sequelize')
var sequelize = require('../config/db')
var User = require('./user')
var UserType = require('./userType')
var Exercice = require('./exercice')
var ExerciceType = require('./exerciceType')
var Question = require('./question')
var Chapter = require('./chapter')
var Response = require('./response')
var UserGrades = require('./userGrades')


/*
 var Level = require('./level')

 var Registered = require('./registered')
 var Result= require('./result')

 */










//Exercice.belongsTo(Level)
//User.belongsToMany(Chapter, {through : 'registered' , as : 'student' } )
//Chapter.belongsToMany(User, {through : 'registered' } )
//User.belongsToMany(Exercice, {through : 'result' , as : 'student' } )
//Exercice.belongsToMany(User, {through : 'result' } )
/*
 Project.belongsToMany(User, {through: 'UserProject'});
 User.belongsToMany(Project, {through: 'UserProject'});
 */



// les relations entre les tables :
User.belongsTo(UserType)
Exercice.belongsTo(Chapter)
Exercice.belongsTo(ExerciceType)
Question.belongsTo(Exercice)
Response.belongsTo(Question)

User.belongsToMany(Exercice , {through : UserGrades})
Exercice.belongsToMany(User , {through : UserGrades})

// Synchronisation (Creation des tables) :


//userType
UserType.sync().then(function (arg) {
    console.log("Synchro Table User Type  : Ok");
}).then(function () {
    // User
    User.sync().then(function (arg) {
        console.log("Synchro Table User  : Ok");
    })
}).then(function () {
    UserType.create({
        name: 'student',
    }).then(function () {
        UserType.create({
            name: 'teacher',
        })
    })
})



// Chapter
Chapter.sync().then(function (arg) {
    console.log("Synchro Table Chapter  : Ok");
}).then(function () {
    // Exercice Type
    ExerciceType.sync().then(function (arg) {
        console.log("Synchro Table Exercice Type  : Ok");
    }).then(function () {
        // Exercice
        Exercice.sync().then(function (arg) {
            console.log("Synchro Table Exercice  : Ok");
        })
    }).then(function(){
        Question.sync().then(function(){
            console.log("Synchro Table Questions : OK")
        }).then(function(){
            Response.sync().then(function(){
                console.log("Synchro Table Responses : OK")
            }).then(function () {
                UserGrades.sync().then(function(){
                    console.log("Synchro Table UserGrades : OK")
                })
            })
        })
    })
}).then(function () {
    ExerciceType.create({
        name: 'dndOrder',
    }).then(function () {
        ExerciceType.create({
            name: 'dndWordDefinition',
        })
    }).then(function () {
        ExerciceType.create({
            name: 'fillBlank',
        })
    }).then(function () {
        ExerciceType.create({
            name: 'directQuestion',
        })
    })
})






Chapter.create({title:"Introduction" , nbExercices : 0 }).then(function(){
    console.log('Chap 1 created')
})

/*
 Result.sync().then(function(arg) {
 console.log("Synchro Table Users  : Ok");
 })


 Registered.sync().then(function(arg) {
 console.log("Synchro Registered : Ok");
 })


 Chapter.sync().then(function(arg) {
 console.log("Synchro Chapter  : Ok");
 })

 Level.sync().then(function(arg) {
 console.log("Synchro Table level  : Ok");
 })

 Exercice.sync().then(function(arg) {
 console.log("Synchro Table exercice  : Ok");
 })
 */


var models = {
    User: User,
    UserType: UserType,
    Exercice: Exercice,
    ExerciceType: ExerciceType,
    Chapter: Chapter
}

module.exports = models