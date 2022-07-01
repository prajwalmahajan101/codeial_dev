// Node Modules
const express = require('express')
const passport = require('passport')


// Project Modules
// --> Passport Authentication
const passportLocal = require('../configs/passport_local_strategy')

//Controllers
const homeController = require('../controllers/home_controller')
//Variables
const router = express.Router()

//Request Handler  --->
// get
router.get('/',passportLocal.checkAuthentication,homeController.home)
router.use('/users',require('./users'))
router.use('/posts',require('./posts'))
router.use('/comments',require('./comments'))

// Export  Router
module.exports = router