const nodemailer = require('nodemailer')
const ejs = require('ejs')
const path = require('path')

let env = {}
try {
    env = require('../env')
}catch (err){

}


let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port: 465,
    secure: true,
    auth :{
        user:env.emailAcc || process.env.emailAcc,
        pass:env.emailPass || process.env.emailPass
    }
})

let renderTemplate = (data,relativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        (err,template)=>{
            if(err){
                console.log("Error in Rendering Template ",err)
                return
            }
            mailHTML = template
        }
    )
    return mailHTML
}

module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate,
}


