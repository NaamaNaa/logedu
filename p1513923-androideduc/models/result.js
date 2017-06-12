/**
 * Created by HAMIZI16000 on 30/04/2017.
 */

var Sequelize = require('sequelize')
var sequelize = require('../config/db')



Result = sequelize.define('registered', {

    noteExo : Sequelize.INTEGER,
    noteChapter : Sequelize.INTEGER

})


module.exports = Result