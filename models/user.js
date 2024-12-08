const mongoose = require("mongoose");
const {createHmac , randomBytes} = require('crypto');
const { createTokenForUser } = require("../services/authentication");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type:String,
        required: true,
    },
    salt: {
        type: String,
        
    },

    
    profileImageURL: {
        type: String,
        default: "/images/images.jpeg"
    },
    role:{
        type: String,
        enum: ["USER" ,"ADMIN"],
        default: "USER",
    }
   
}, 
{timestamps: true});

// whenever you are going to save this schema - pre
userSchema.pre('save', function(next){
    const user = this;

    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
});

// creating function named - matchpassward
userSchema.static("matchPasswordandGenerateToken",async function(email, password){
    const user = await this.findOne({email});
    if(!user) throw new Error('User not found');

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedPasswordHash = createHmac("sha256", salt).update(password).digest("hex");

    if(hashedPassword!=userProvidedPasswordHash) throw new Error("user password is wrong!");
    // return hashedPassword === userProvidedPasswordHash;
    // if both password is matched  i will return user
    // return {...user._doc, password: undefined, salt: undefined}; //returning user object;
    // return user;
    const token = createTokenForUser(user);  //createtokenforuser ke andar user object pass kr reha hai
    return token;
    // console.log(user);
})



// passing schema into model
const User = mongoose.model("user", userSchema);

module.exports = User;