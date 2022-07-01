const nodeMailer = require('../configs/nodemailer')


exports.newComment = (commnet) =>{
    nodeMailer.transporter.sendMail({
        form:"codeial@gmail.com",
        to:commnet.post.user.email,
        subject:"New Comment Published",
        html:'<h1> yup !!!!, Post have a new comment on it </h1>'
    },(err,info)=>{
        if(err) console.log("Error in Sending Mails",err)
        else console.log("Message Sent ", info)
        return
    })

}