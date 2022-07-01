// Node Modules
const express = require('express')
const passport = require('passport')

// Project Modules
// --> Passport Authentication
const passportLocal = require('../configs/passport_local_strategy')
//Controllers
const postController = require('../controllers/posts_controller')
//Variables
const router = express.Router()

//Request Handler  --->
// get
router.get('/destroy/:id',passportLocal.checkAuthentication,postController.destroy)
//post
router.post('/create',passportLocal.checkAuthentication,postController.createPost)


// Export  Router
module.exports = router