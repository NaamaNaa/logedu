var Sequelize = require('sequelize')
var sequelize = require('../config/db')


ExerciceType = sequelize.define('exerciceType', {
    name: Sequelize.STRING,
})


module.exports = ExerciceType