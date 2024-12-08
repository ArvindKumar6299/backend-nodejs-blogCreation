const { validateToken } = require("../services/authentication");


function checkForAuthenticationCookie(cookieName){
    console.log("helllooo from checkfor")
    return (req,res,next)=>{
        const tokenCookieValue = req.cookies[cookieName];
        console.log(tokenCookieValue)
         //Retrieves the value of the cookie specified by cookieName from the request's cookies using req.cookies.
        
        if(!tokenCookieValue){
           return next();
        }

       try {
          const userPayload = validateToken(tokenCookieValue); 
           //validateToken likely verifies the token's signature and decodes its payload, returning the user's information (e.g., id, role, etc.).
            console.log(userPayload + "this si userpayload")
           req.user = userPayload;  //If validateToken succeeds, it assigns the decoded user information (payload) to req.user.
        //   console.log(req.user)                        //This makes the authenticated user's data available throughout the request lifecycle.
       } catch (error) {}

        return next();
    }
}

module.exports = {checkForAuthenticationCookie};

//  npm i cookie-parser
//Note: The cookie-parser package must be installed (npm i cookie-parser) and used in the application to enable req.cookies.