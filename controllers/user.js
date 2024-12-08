const express = require("express");
const User = require("../models/user")


const signUp = async (req,res) => {
    const {name, email, password} = req.body;  //extracting data from request body

    try {
        const user = new User({name,email,password}); // creating new user doc
        await user.save();      //saving the user inside data base
        // res.status(201).json({message: "User registered successfully!"});

        return res.redirect("/user/login");
    } catch (error) {
        res.status(400).json({message: "Error registering User", error});
    }
     
}

const login = async (req,res) =>{
    try {
        const {email,password}  = req.body; // extracting data from request body
        const token = await User.matchPasswordandGenerateToken(email,password);
        
    
        console.log("token", token);
        //eak cookie banay ge and uske ander token daal den ge
        return res.cookie("token", token).redirect("/");
    
    } catch (error) {
        return res.render("signin",{
            error: "Incorrect Email or Password",
        })
    }
  
   
}

const logout = (req,res) =>{
    res.clearCookie("token").redirect("/");
}

module.exports = {signUp , login , logout};