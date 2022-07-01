// Modules
const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy
const crypto = require('crypto')

//Modles
const User = require('../models/user')

let env = {}
try {
    env = require('../env')
}catch (err){

}

passport.use(new googleStrategy({
        clientID: env.clientID || process.env.clientID,
        clientSecret: env.clientSecret || process.env.clientSecret,
        callbackURL: env.callbackURL || process.env.callbackURL,
},
    (accessToken,refreshToken,profile,done)=>{
    User.findOne({email:profile.emails[0].value}).exec((err,user)=>{
        if(err){
            console.log("Error Occurred in Google Authentication Strategy")
            return done(err)
        }
        // console.log(profile)
        if(user){
            return done(null,user)
        }
        else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex'),
                isEmailVerified:true,
                isPasswordUserCreated:false,
            },(err,user)=>{
                if(err){
                    console.log("Error in Creating User ")
                    return done(err)
                }
                else{
                    return done(null,user)
                }
            })
        }
    })

}))

module.exports = passport

