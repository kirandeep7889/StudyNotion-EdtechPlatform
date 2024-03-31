const Profile=require("../models/Profile");
const User=require("../models/User");

exports.updateProfile=async(req,res)=> {
    try{
        //get data
        const {dateOfBirth="",about="",contactNumber,gender}=req.body;

        //get userid
        const id=req.user.id;

        //validation
        if(!contactNumber || !gender || !id) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        //find profile
        const userDetails=await User.findById(id);
        const profileId=userDetails.additionalDetails;
        const profileDetails=await Profile.findById(profileId);
        
        //update profile
        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.about=about;
        profileDetails.gender=gender;
        profileDetails.contactNumber=contactNumber;
        await profileDetails.save();

        //return response 
        return res.status(200).json({
            success:true,
            message: "profile updated Successfully"
        })
  
    }
    catch(err) {
        return res.status(400).json({
            success:false,
            message: "Unable to update profile"
        })
    }
  
}


//delete account

exports.deleteAccount= async (req,res)=> {
    try{
       //get id
       const id=req.user.id;
       //validation
       const userDetails=await User.findById(id);
       if(!userDetails) {
        return res.status(400).json({
            success:false,
            message:'user not found'
        })
       }
       //delete profile
       await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
  
       //todo:unenroll user from all enrolled courses

       //delete user
       await User.findByIdAndDelete({_id:id});
      
       //return response
       return res.status(200).json({
        success:true,
        message: 'user deleted successfully'
       })
    }
    catch(err) {
        return res.status(400).json({
            success:false,
            message: "Unable to delete user"
        })
    }
}