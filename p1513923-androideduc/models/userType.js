var Sequelize = require('sequelize')
var sequelize = require('../config/db')


UserType = sequelize.define('userType', {
    name: Sequelize.STRING,
})


module.exports = UserType