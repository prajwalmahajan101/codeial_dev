// Node Modules
const express = require('express')
const expressLayout = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')
const sassMiddleWare = require('node-sass-middleware')
const flash = require('connect-flash')


let env = {}
try {
    env = require('./env')
}catch (err){

}


// Project module
const db = require('./configs/mongoose')
const passportLocal = require('./configs/passport_local_strategy')
const passportGoogle = require('./configs/passport-google-oauth2-strategy')
const  middleware = require('./configs/middlewares')
// Variable

const app = express()
const port = process.env.PORT || 8080

// Middlewares --->



//SASS Middleware
app.use(sassMiddleWare({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:false,
    outputStyle:'extended',
    prefix:'/css'
}))

//Request Body Parser
app.use(bodyParser.urlencoded({extended:false}))

//cookie Parser
app.use(cookieParser())

// Static Folder
app.use(express.static('./assets'));



// Layout Middleware
//set Layout
app.use(expressLayout)
//extract link ans script
app.set("layout extractStyles", true)
app.set("layout extractScripts", true)


// View Engine
app.set("view engine","ejs")
// Views Folder Location
app.set("views","./views")



//Passport session
app.use(expressSession({
    name:'codeial',
    secret: env.Secret ||process.env.Secret || "BlahSomething",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (30*60*1000)   // 30 minutes
    },
    store:new MongoStore({
        mongoUrl: env.DBUrl || process.env.DBUrl || "mongodb://localhost:27017/test_codeial",
        autoRemove: 'disabled'
    })
}))
//Passport Authentications
app.use(passport.initialize())
app.use(passport.session())


//Flash Message
//Using Connect flash middleware to store flash message
app.use(flash())
//Using middleware to send Flash msg form req to res
app.use(middleware.setFlash)

//Setting the user
app.use(passport.setAuthenticatedUser)


//routers
app.use('/',require('./routes'))


// Server
app.listen(port,(err)=>{
    if(err) console.log(`error on running the server on port : ${port}`)
    else console.log(`Server is running on port: ${port}`)
})
