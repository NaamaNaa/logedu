/**
 * Created by Mahmoud on 29/04/2017.
 */

var Sequelize = require('sequelize')
var sequelize = require('../config/db')


Chapter = sequelize.define('chapter', {

    title : Sequelize.STRING,
    nbExercices : Sequelize.INTEGER
})

module.exports = Chapter