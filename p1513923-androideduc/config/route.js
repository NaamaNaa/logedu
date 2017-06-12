/**
 * Created by Mahmoud on 30/04/2017.
 */
var app = require('../app')



//index
app.use('/index' , require('../controller/index'))
// user
app.use('/user' , require('../controller/userController'))
// user type
app.use('/usertype' , require('../controller/userTypeController'))
// chapter + exercice
app.use('/formation/chapitre' , require('../controller/chapterController'))



module.exports= app