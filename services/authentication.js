const JWT = require("jsonwebtoken");

const secret = "Arvind$6299$";


function createTokenForUser(user){
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    };
   
    console.log(payload);

    const token = JWT.sign(payload, secret);
    return token;               //this function will taken user object and will return token
}


function  validateToken(token){
    // console.log("vaiatetoken")
    const verif = JWT.verify(token,secret);
    // console.log("this is palyload" + verif)
    return verif;
}

module.exports = {createTokenForUser, validateToken};