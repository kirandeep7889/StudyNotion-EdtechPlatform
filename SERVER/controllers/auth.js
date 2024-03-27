const User=require("../models/User");
const OTP=require("../models/OTP");
const otpGenerator=require("otp-generator");
const  bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();


//SEND OTP CONTROLLER
exports.sendOTP=async(req,res)=> {
    try{
    const {email}=req.body;
    //check if user already exists
    const checkUserPresent=await User.findOne({email});
    
    if(checkUserPresent) {
        return res.status(401).json({
            success:false,
            message: "User Already registered"
        })
    }
    //generate otp
    var otp=otpGenerator.generate(6 ,{
        upperCaseAlphabets: false,
        lowerCaseAlphabets:false,
        specialChars:false
    });
    console.log("otp generated", otp);
    
    //check otp unique or not
    let result=await OTP.findOne({otp:otp});

    while(result) {
        otp=otpGenerator(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
       result=await OTP.findOne({otp:otp}); 
    }
    const otpPayload=(email,otp);

    //create an entry for OTP
    
    const otpBody=await OTP.create(otpPayload);
    console.log(otpBody);

    res.status(200).json({
        success: true,
        message: "OTP Sent Successfully"
    })

} catch (error) {
    console.log(error);
    return res.status(500).json({
        success: false,
        message: error.message
    })
  }
}


//SIGNUP CONTROLLER

exports.signup=async(req,res)=> {
    try{
            //data fetch from request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        }=req.body;
    
       //validate inputs
       if(!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
              return res.status(403).json({
                success: false,
                message: "All fields are required",
              })
       }
    
      //match the two password 
         if(password!==confirmPassword) {
            return res.status(400).json({
                success:false,
                message: 'password and confirm password value does not match.please try again'
            })
         }
        
         //check user already exists or not
         const existingUser=await User.findOne({email});
    
         if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already registered"
            })
         }
    
         //find most recent OTP stored for the user
         const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);
         console.log(recentOtp);
    
         //validate OTP
         if(recentOtp.length==0) {
            //OTP not found
            return res.status(400).json({
                success:false,
                message: 'otp not found'
            })
         } else if(otp!==recentOtp.otp) {
              //Invalid otp input from user
              return res.status(400).json({
                success: false,
                message: "Invalid OTP",
              });
         }
    
         //hash password
         const hashedPassword= await bcrypt.hash(password,10);
    
        const profileDetails=await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        })
    
         //entry of user to db
         const user=await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
         });
    
         //return res
         res.status(200).json({
            success: true,
            message: "User is registered Succefully",
            user
         })
    }
    catch (error) {
         res.status(403).json({
            success:false,
            message: "error creating user"
         })
    }

}


//LOGIN CONTROLLER

exports.login=async(req,res)=> {
   try{
     //get data from req body
     const {email,password}=req.body;

    //vaidation data
    if(!email || !password) {
        return res.status(403).json({
            success: false,
            message: "All fields are required.Please try Again"
        })
    }

    //check user exists or not 
    const user=await User.findOne({email}).populate("additionalDetails");
  
    if(!user) {
        return res.status(401).json({
            success: false,
            message: "User is not registered,please signup first"
        })
    }

    //generate JWT,after matching passwords
    if(await bcrypt.compare(password,user.password)) {
        const payload= {
            email: user.email,
            id: user._id,
            accountType: user.accountType,
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn: "2h",
        });
        user.token=token;
        user.password=undefined;

        //create cookie and send response
        const options= {
            expires: new Date(Date.now()+3*24*60*60*1000),
            httpOnly: ture
        }
        res.cookie("token",token,options).status(200).json({
            success: true,
            token,
            user,
            message: 'logged in successfully'
        })
    }
    else {
        return res.status(401).jsonn({
            success: false,
            message: "Password is incorrect"
        })
    }

   }catch (error) {
       console.log(error)
       return res.status(500).json({
        success:false,
        message: "Login Failure.. please try again"
       })
   }
}


//CHANGE PASSWORD CONTROLLER

exports.changePassword=()=>{
    //get data from req body
    //get oldpassword,newpassword,confirmNewpassword
    //validation

    //update pwd in db
    //send mail-password updated
    //return response

}