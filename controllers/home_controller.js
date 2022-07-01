//Models
const Post = require('../models/post')
const User = require('../models/user')

exports.home = async (req,res,next)=>{

    try {
        //Fetch All Post And populate
        const posts = await Post.find({}).populate('user').populate({path: 'comments', populate: {path: 'user'}})
        //Fetch All Users
        let  users = await User.find({})
        // let  users = await User.where('_id').ne(req.user.id)

        const data = {
            title: "Home",
            posts: posts,
            users: users,

        }
        //Renders home.ejs from views Folder And Passes the data to ejs file
        res.render('home', data)
    }
    catch (err){
        req.flash('error','Error in Fetching posts from DataBase')
        return res.redirect("back")
    }
}
