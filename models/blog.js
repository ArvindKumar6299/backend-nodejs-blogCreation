const mongoose = require("mongoose");
const {Schema} = mongoose;


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    coverImageURL: {
        type: String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,   // giving id from mongodb user model 
        ref: "user",       
    }
},
 {timestamps: true});

//passing this schema inside model
const Blog =  mongoose.model("blog", blogSchema);

module.exports = Blog;