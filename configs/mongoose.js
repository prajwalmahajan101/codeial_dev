const mongoose = require('mongoose')
let env = {}
try {
     env = require('../env')
}catch (err){

}

const DBUrl = env.DBUrl || process.env.DBUrl || "mongodb://localhost:27017/test_codeial"

mongoose.connect(DBUrl)

const Db = mongoose.connection;

Db.on('error',console.error.bind(console,"Error connect to MongoDb"))

Db.once('open',()=>{
    console.log("Connected To DataBase :: MongoDb")
})

module.exports = Db
