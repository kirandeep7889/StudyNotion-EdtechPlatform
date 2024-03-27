
const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const bcrypt=require("bcrypt");


//resetPasswordToken
exports.ResetPasswordToken=async (req,res)=> {
            try{
                //get email from req body
                const {email}=req.body;
                
                //check user for this email,email validation

                const user=await User.findOne({email});

                if(!user) {
                return res.json({
                    message: "Your email is not registered"
                })
                }

                //generate token
            const token=crypto.randomUUID();
            
            //update user by adding token and expiration time

            const updatedDetails=await User.findOneAndUpdate({email},
                {
                    token:token,
                    resetPasswordExpires: Date.now() + 5*60*1000,
                },
                {new : true}
                )
                //create URL
            const url=`http://localhost:3000/update-password/${token}`;

            //send mail containing the url
            await mailSender(email,"Password Reset Link", `password reset link : ${url}`);
            

            //return response 
            return res.json({
                success: true,
                message: "Email sent Succesffully ,please check email and change pwd"
            })
            }
   catch (err) {
       console.log(err);
        return res.status(500).json({
            success: false,
            message: "something went wrong while sending mail"
        })
   }
}


//reset Password Controller

exports.resetPassword =async(req,res)=> {
 
    try{
    //data fetch
    const {password,confirmPassword}=req.body;

    //validation 
    if(password !==confirmPassword) {
        return res.json({
            success: false,
            message: 'password does not match'
        })
    };
    //get user detail from db using token
    const userDetails=await User.findOne({token});

    //if no entry-invalid token
    if(!userDetails) {
        return res.json({
            success: false,
            message: "token is invalid"
        })
    }

    //token time check
      if(userDetails.resetPasswordExpires < Date.now() ) {
         return res.json({
            success: false,
            message: "token is expired"
         })
      }
   
      //hash the password 
     const hashedPassword=await bcrypt.hash(password,10);

     //update  password in db
     await User.findOneAndDelete(
        {token:token},
        {password:hashedPassword},
        {new:true}
        )
      //return response 
      return res.status(200).json({
        success: true,
        message: "password reset successful"
      })
    }
catch (err) {
     console.log(err);
}
}

