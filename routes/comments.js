// Node Modules
const express = require('express')
const passport = require('passport')

// Project Modules
// --> Passport Authentication
const passportLocal = require('../configs/passport_local_strategy')
//Controllers
const commentController = require('../controllers/comments_controller')
//Variables
const router = express.Router()

//Request Handler  --->
// get
router.get('/edit/:id',passportLocal.checkAuthentication,commentController.edit)
router.get('/delete/:id',passportLocal.checkAuthentication,commentController.destroy)
//Post
router.post('/create',passportLocal.checkAuthentication,commentController.create)


// Export  Router
module.exports = router