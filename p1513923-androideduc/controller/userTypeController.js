var express = require('express');
var router = express.Router();
var model = require('../models/userType')


/* GET user listing. */
router.get('/', function (req, res, next) {


    model.findAll().then(function (userTypes) {
        res.render('userType/showAll', {userTypes: userTypes})
    })

});


// renvoie le formulaire
router.get('/add', function (req, res) {
    res.render('userType/add');

})


router.post('/persist', function (req, res) {
    formData = req.body.formData
    console.log(formData)
    model.create({name: formData.name}).then(function (created) {
        console.log('user Type created : ' + created.get('name'))
    })
    res.send('ok')

})

router.delete('/delete', function (req, res) {
    id = req.body.id
    model.findById(id).then(function (userType) {
        console.log(userType.name)
        userType.destroy({force: true})
        res.send('ok  : ' + id)
    })

})


module.exports = router;
/**
 * Created by Mahmoud on 03/05/2017.
 */
