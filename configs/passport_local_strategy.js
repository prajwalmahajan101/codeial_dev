//Modules
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

//Model
const User= require('../models/user')
const req = require("express/lib/request");

//

passport.use(new LocalStrategy({
    usernameField : 'email',
    passReqToCallback: true,
},(req,email,password,done)=> {
    User.findOne({email: email}, (err, user) => {
        if (err) {
            req.flash('error','Error in Finding User')
            console.log("Error in Finding User --> Passport")
            return done(err)
        }
        if (!user || user.password !== password) {
            req.flash('error','Invalid Username/Password')
            console.log("Invalid Username/Password")
            return done(null, false)
        }
        return done(null, user)
    })
}))


//Serializing Model to Decide the field to store in cookie

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

//Deserializing Data form cookie to a User Model

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        if (err) {
            console.log("Error in Finding User --> Passport")
            return done(err)
        }
        if(!user) return done(null,false)
        else return done(null,user)
    })
})


passport.checkAuthentication = (req,res,next)=>{
    //If User is Signed in
    if(req.isAuthenticated()){
        if(! req.user.isPasswordUserCreated){
            return res.render("create_password",{
                title:"Create Password"
            })
        }
        if(! req.user.isEmailVerified){
            return res.render("email_verify",{
                title:"Verify Email"
            })
        }

        return next();
    }
    //If User is Not Signed in
    else {
        req.flash('error','Your Are Not Logged-in')
        return res.redirect("/users/sign-in")
    }


}


passport.setAuthenticatedUser = (req,res,next) =>{
    if(req.isAuthenticated()){
        // User which the req have is sent to the res
        res.locals.user = req.user
    }
    next()
}



module.exports = passport