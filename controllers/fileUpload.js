const File=require("../models/file");
const cloudinary=require("cloudinary").v2;

exports.localFileUpload=async(req,res)=>{
    try {
        const file=req.files.file;
        console.log(file);

        let path=__dirname+"/files/"+Date.now()+`.${file.name.split('.')[1]}`;

        file.mv(path);

        file.mv(path,(err)=>{
            console.log(err);
        });
        res.json({
            success:"true",
            message:"Local file uploaded successfully"
        });
    } catch (error) {
        console.log(error);
    }
};
function isFileTypeSupported(type,supportedType){
    return supportedType.includes(type); //includes returns true or false 
}

async function uploadFileToCloudinary(file,cloudinaryFolder,quality){
          const options={folder:cloudinaryFolder};
          if(quality){
            options.quality=quality;
          }
          options.resource_type="auto";
          return await cloudinary.uploader.upload(file.tempFilePath,options);
}
exports.imageUpload=async (req,res)=>{
    try {
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log(file);

        const supportedType=["jpeg","jpg","png"];

        const fileType=file.name.split(".")[1].toLowerCase();
        if(!isFileTypeSupported(fileType,supportedType)){
            return res.status(400).json({
                success:false,
                message:"File format not supported",
            })
        }
      const response=await uploadFileToCloudinary(file,"banna");
      console.log(response);

      //database m save karte hai

      const fileData= await File.create({
        name,tags,email,imageUrl:response.secure_url,
      })


      res.json({
        sucess:true,
        imageUrl:response.secure_url,
        message:"uploaded successfully"
      })
 
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    };
}

exports.videoUpload=async (req,res)=>{
    try {
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.videoFile;
        console.log(file);

        const supportedType=["mov","mp4"];

        const fileType=file.name.split(".")[1].toLowerCase();
        if(!isFileTypeSupported(fileType,supportedType)){
            return res.status(400).json({
                success:false,
                message:"File format not supported",
            })
        }
        console.log(fileType);
      const response=await uploadFileToCloudinary(file,"banna");
      console.log(response);

      //database m save karte hai

      const fileData= await File.create({
        name,tags,email,imageUrl:response.secure_url,
      })
       console.log(fileData);

      res.json({
        sucess:true,
        imageUrl:response.secure_url,
        message:"uploaded successfully"
      })
 
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    };
}

exports.imageSizeReducer=async (req,res)=>{
    try {
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log(file);

        const supportedType=["jpeg","jpg","png"];

        const fileType=file.name.split(".")[1].toLowerCase();
        if(!isFileTypeSupported(fileType,supportedType)){
            return res.status(400).json({
                success:false,
                message:"File format not supported",
            })
        }
        console.log(fileType);
      const response=await uploadFileToCloudinary(file,"banna",30);
      console.log(response);

      //database m save karte hai

      const fileData= await File.create({
        name,tags,email,imageUrl:response.secure_url,
      })
       console.log(fileData);

      res.json({
        sucess:true,
        imageUrl:response.secure_url,
        message:"uploaded successfully"
      })
 
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    };
}