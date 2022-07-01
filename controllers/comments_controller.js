//Models
const Post = require("../models/post")
const Comment = require("../models/comment")

// Mailers
const commentsMailer =  require('../mailer/comments_mailer')

exports.create=async (req,res,next)=>{
    try {
        const post = await Post.findById(req.body.post_id)
        let comment = await Comment.create({
            content: req.body.content,
            user: req.user._id,
            post: post._id
        })
        post.comments.push(comment._id)
        post.save()
        //await Post.find({}).populate('user').populate({path: 'comments', populate: {path: 'user'}})
        comment = await Comment.findById(comment._id).populate('user').populate({path: 'post', populate: {path: 'user'}})
        commentsMailer.newComment(comment)
        req.flash('success','Comment Created Successfully')
        return res.redirect("back")
    }
    catch (err){
        req.flash('error','Error occurred while Creating the Comment')
        console.log("Error in creating a Comment",err)
        return res.redirect("back")
    }
}


exports.edit = (req,res,next) =>{
    const data = {
        message:"Edit Mode",
        data:req.body,
        }
        return res.send(data)
}

exports.destroy = async (req,res,next) =>{
    try{
        const comment = await Comment.findById(req.params.id)
        if( comment && comment.user.toString()===req.user.id) {
            const post_id = comment.post
            await Post.findByIdAndUpdate(post_id,{$pull:{comments:req.params.id}})
            comment.remove();
            req.flash('success','Comment is Successfully Deleted')
            return res.redirect("back")
        }
        else{
            req.flash('error','You Are Not Authorized To Delete this Comment')
            return res.redirect("back")
        }
    }catch (err){
        req.flash('error','Error occurred while Deleting the Comment')
        console.log("Error in deleting the Comment",err)
        return res.redirect("back")
    }
}






