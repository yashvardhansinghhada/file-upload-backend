const express =require("express");
const app=express();

require("dotenv").config();
const PORT= process.env.PORT || 3000;

app.use(express.json());
//file-upload package use
const fileUpload=require("express-fileupload");
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/',
}));  

require("./config/database").connectToDb();

require("./config/cloudinary").cloudinaryConnect();

//routes
const Upload=require("./routes/upload.js");
app.use("/api/v1/upload",Upload);
 
app.listen(PORT,(req,res)=>{console.log(`listening at port ${PORT}`)})