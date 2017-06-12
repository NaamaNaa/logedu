/**
 * Created by Mahmoud on 01/06/2017.
 */



var Sequelize = require('sequelize')
var sequelize = require('../config/db')



Response = sequelize.define('response', {

    response : Sequelize.STRING,

})

module.exports = Response