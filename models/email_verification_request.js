const mongoose = require('mongoose')
const requestSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
},{
    timestamps:true,
})

const Request = mongoose.model('Request',requestSchema)


module.exports = Request