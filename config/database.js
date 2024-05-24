const mongoose = require("mongoose");
require("dotenv").config();

exports.connectToDb=()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{console.log("DB connection successful")})
    .catch((err)=>{
        console.log("DB Connection failed");
        console.log(err);
        process.exit(1)
});
}