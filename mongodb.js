const mongoose = require("mongoose");

const connectDB = async (URL) =>{
    try {
        await mongoose.connect(URL);
        console.log("Db connected!")
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;