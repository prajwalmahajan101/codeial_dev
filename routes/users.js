// Node Modules
const express = require('express')
const passport = require('passport')


// Project Modules
// --> Passport Authentication
const passportLocal = require('../configs/passport_local_strategy')
//Controllers
const usersController = require('../controllers/users_controller')
//Variables
const router = express.Router()

//Request Handler  --->
// get
router.get('/verify/:id',usersController.verifyEmail)
router.get('/email_verification_resend',usersController.resendEmailVerificationMail)
router.get('/sign-up',usersController.signUp)
router.get('/sign-in',usersController.signIn)
router.get('/profile/:id',passportLocal.checkAuthentication,usersController.profile)

router.get('/sign-out',usersController.destroySession)
router.get('/forget-password',usersController.forgetPassword)


//post
router.post('/generate-password',usersController.generatePassword)
router.post('/create',usersController.createUser)
router.post('/create-password',usersController.createPassword)
router.post('/update/:id',passportLocal.checkAuthentication,usersController.upDateUser)

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},

    ),usersController.createSession)


router.get('/auth/google',passport.authenticate(
    'google',
    {scope:['profile','email']}

))

router.get('/auth/google/callback',passport.authenticate(
    'google',
    {failureRedirect:'/users/sign-in'},
),usersController.createSession)



// Export  Router
module.exports = router