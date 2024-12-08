const express  = require("express");
const {login, signUp, logout} = require("../controllers/user")

const router = express.Router();

router.get("/signup", (req,res) =>{
    return res.render("signup");
})

router.get("/login", (req,res)=>{
    return res.render('signin');
})

router.get("/logout",logout);

router.post("/signup",signUp);
router.post("/login", login);

module.exports = router;