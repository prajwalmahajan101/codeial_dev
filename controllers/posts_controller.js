// Models
const Post = require("../models/post")
const Comment = require("../models/comment")

exports.createPost = async (req,res,next) =>{

    const formData = req.body.content
    try {
        let post = await Post.create({
            content: formData,
            user: req.user._id
        })
        req.flash('success','Post Created Successfully')
        res.redirect("back")
    }
    catch (err) {
        req.flash('error','Error occurred while Creating the Post')
        console.log("Error in Creating the Post",err)
        res.redirect("back")

    }

}


exports.destroy = async (req,res,next) =>{
    try {
        const post = await Post.findById(req.params.id)
        if (post && post.user.toString() === req.user.id) {
            await Comment.deleteMany({post: req.params.id})
            req.flash('info','Comments Related To The Post Are Deleted')
            post.remove()
            req.flash('success','Post Deleted Successfully')
            return res.redirect("back")
        } else {
            req.flash('error','You Are Not Authorized To Delete this Post')
            return res.redirect("back")
        }
    }
    catch(err){
        req.flash('error','Error Occurred while deleting the Post Try Again!!')
        console.log("Error in Deleting the Post",err)
        return res.redirect("back")
    }
}