/**
 * Created by Mahmoud on 29/04/2017.
 */


var Sequelize = require('sequelize')
var sequelize = require('../config/db')



Level = sequelize.define('level', {
    name : Sequelize.STRING
})


module.exports = Level