/**
 * Created by Mahmoud on 10/06/2017.
 */


var Sequelize = require('sequelize')
var sequelize = require('../config/db')


UserGrade = sequelize.define('userGrades', {
    grade : Sequelize.INTEGER
})


module.exports = UserGrade