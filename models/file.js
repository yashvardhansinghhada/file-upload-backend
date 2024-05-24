const mongoose=require("mongoose");
const nodemailer=require("nodemailer");
require("dotenv").config();

const fileSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    tags:{
        type:String,
    },
    imageUrl:{
        type:String,
    }
});

fileSchema.post("save",async function(doc){
    try {
        console.log("DOC",doc);
        
        let transporter= nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                pass:process.env.MAIL_PASSWORD,
                user:process.env.MAIL_USER,
            }
        })
        let info=await transporter.sendMail({
            from:`banna`,
            to: doc.email,
            subject:"New file uploaded on cloudnery",
            html:`<h2>Hello</h2><p>File Upload Viewhere:<a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`
        })
        console.log(info);
    } catch (error) {
        console.error(error);
    }
})

module.exports=mongoose.model("File",fileSchema);