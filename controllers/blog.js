const multer = require("multer");
const path = require("path");
const Blog = require("../models/blog")

const addBlog = (req,res) =>{
    return res.render( "partials/addBlog" , {
        user:req.user,
    })
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`));
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname;
      cb(null, fileName);
    }
  })
  
  const upload = multer({ storage: storage });


  const uploadBlog = async (req,res)=>{
    console.log(req.file)
    
    const {title, body} = req.body;
    const blog = await Blog.create({
        title,
        body,
        coverImageURL: req.file.filename,
        createdBy: req.user._id,
    })
    // return res.redirect(`/blog/${blog._id}`);
    return res.redirect("/")
  }


const BlogById = async (req,res) =>{
    console.log("this is req params "+req.params.id)
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    console.log("this is when" + blog)
    return res.render("newblog", {
        user: req.user,
        blogs:blog
    });
}  

module.exports = { addBlog , uploadBlog ,upload ,BlogById};