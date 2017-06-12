/**
 * Created by Mahmoud on 30/05/2017.
 */



var Sequelize = require('sequelize')
var sequelize = require('../config/db')



Question = sequelize.define('question', {

    statement : Sequelize.STRING,
    nbResponses : Sequelize.INTEGER,

})

module.exports = Question