const express = require("express");
const app = express();

const connectDB = require("./mongodb")
const path = require("path");
const userRoute = require('./routes/user')
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const Blog = require("./models/blog")
const blogRoute = require("./routes/blog")

app.use(express.static(path.resolve('./public')));
app.use(express.static(path.join(__dirname, "./public")));
app.use('/public', express.static('public'));


app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(checkForAuthenticationCookie("token")); //sending token cookie from your local system server - which has been created while login to verify



const PORT = 5000;
const URL = "mongodb://localhost:27017/blogify";
connectDB(URL);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req,res)=>{
    const allBlogs = await Blog.find({});

    console.log("this is from index page" + req.user)
    return res.render("home" , {
       user:req.user,   //passing user object
       blogs: allBlogs,
    });
    
})
app.get("home",(req,res)=>{
    res.render("home")
})

app.use("/blog", blogRoute );
app.get("/open/:id", async (req,res) => {
    console.log("this is req params "+req.params.id)
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    console.log("this is when" + blog)
    return res.render("newblog", {
        user: req.user,
        blogs:blog
    });
})

app.use("/user", userRoute);

app.listen(PORT, (err)=>{
    if(err) console.log(err);
    console.log("Server is running!")
})