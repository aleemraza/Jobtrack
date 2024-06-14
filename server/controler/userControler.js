const User = require('../Model/userModel')
const Job = require('../Model/jobModel')
const cloudinary = require('cloudinary')
const {formatImage}  = require('../middleware/multerMiddleware')
exports.getApplicationStats = async(req,res)=>{
    try{
        const user = await User.countDocuments()
        const job = await Job.countDocuments()
        res.status(200).json({
            message:"this is very good",
            data:{
                user, 
                job
            }
        })
    }catch(error){
        console.log(error)
        res.status(404).json({
            status:"failed",
            message:"Internal Server Error",
        });
    }
};
exports.updateUser = async(req,res)=>{
    try{
        // Create a new user object excluding password and role
        const newUser = {...req.body};
        delete newUser.password
        delete newUser.role
        // If there's a file in the request, handle image upload
        if(req.file){
            const file = formatImage(req.file)
            const response  = await cloudinary.v2.uploader.upload(file)
            newUser.avatar = response.secure_url;
            newUser.avatarPublicId = response.public_id;
        }
         // Update the user in the database
        const updatedUser = await User.findByIdAndUpdate(req.user._id, newUser, { new: true });
         // If an avatar was updated, delete the old one from Cloudinary
         if(req.file && updatedUser.avatarPublicId){
            await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
         }
           // Send a success response
         res.status(200).json({ 
                message: 'User updated successfully', 
                user: {
                    updatedUser
                } 
            });
    }catch(error){
        res.status(500).json(
            { status: 'Error updating user', error: error.message }
        );
  }
}
