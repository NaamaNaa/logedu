var Sequelize = require('sequelize')
var sequelize = require('../config/db')


User = sequelize.define('user', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
})


module.exports = User