const nodeMailer = require('../configs/nodemailer')

exports.forgetPasswordMail = (user,password) =>{
    const html = nodeMailer.renderTemplate(
        {
            username:user.name,
            password:password
        },
        '/forget_password_mail.ejs')
    nodeMailer.transporter.sendMail({
        from:"prajwal.mahajan@gmail.com",
        to:user.email,
        subject:"New Comment Published",
        html: html
    },(err,info)=>{
        if(err) console.log("Error in Sending Mails",err)
        // else console.log("Message Sent ", info)
        return
    })
}

exports.emailVerificationMail = (user,id)=>{
    const html = nodeMailer.renderTemplate(
        {
            username:user.name,
            id:id
        },
        '/email_verify.ejs')
    nodeMailer.transporter.sendMail({
        from:"prajwal.mahajan@gmail.com",
        to:user.email,
        subject:"Verify Your Email",
        html: html
    },(err,info)=>{
        if(err) console.log("Error in Sending Mails",err)
        // else console.log("Message Sent ", info)
        return
    })

}
