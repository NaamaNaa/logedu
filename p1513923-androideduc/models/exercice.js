/**
 * Created by HAMIZI16000 on 30/04/2017.
 */

var Sequelize = require('sequelize')
var sequelize = require('../config/db')



Exercice = sequelize.define('exercice', {

    statement : Sequelize.STRING,
    nbQuestions : Sequelize.INTEGER,


})

module.exports = Exercice