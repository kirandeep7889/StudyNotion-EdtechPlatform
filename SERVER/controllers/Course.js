const Course=require("../models/Course");
const Tag=require("../models/tags");
const User=require("../models/User");
const {uploadImageToCloudinary}=require("../utils/imageUploader");

//CreateCourse Handler

exports.createCourse=async(req,res)=> {
    try{
        //data fetch
        const {courseName,courseDescrption,whatYouWillLearn,price,tag}=req.body;
       
        //get thumbnail
        const thumbnail=req.files.thumbnailImage;

        //validation 
        if(!courseName || !courseDescrption || !whatYouWillLearn || ! tag || !price || !thumbnail) {
            return res.status(400).json({
                success:false,
                message: "All fields are Mandatory"
            });

        };

        //check for instructor
        const userId=req.user.id;
        const instructorDetails=await User.findById(userId);
        console.log("Instructor Details: ",instructorDetails);

        if(!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: 'Instructor Details not Found'
            });
        }

        //check given tag is valid or not 
        const tagDetails=await Tag.findById(tag);
        if(!tagDetails) {
            return res.status(404).json({
                success: false,
                message: 'Tag Details not Found'
            });           
        }

        //Upload Image to Cloudinary
        const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        //create an entry for new course

        const newCourse=await Course.create({
            courseName,
            courseDescrption,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url
        });

        //add the new course to user schema of instructor

        await User.findByIdAndUpdate({id:instructorDetails._id},
            {$push: {
                courses: newCourse._id,
            }},
            {new:true}
            );

          //update the TAG schema
          await Tag.findByIdAndUpdate({id:tagDetails._id},
            {
                $push: {
                    course:newCourse._id,
                }
            },{new:true}
            )
          
          //return response
          return res.status(200).json({
            success:true,
            message: "Course created Successfully",
            data:newCourse
          })
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message,
            message: 'failed to create Course'
        })
    }
}


//showAll courses

exports.showAllCourses=async (req,res)=> {
    try{
      const allCourses=await Course.find({},{
        courseName:true,
        price:true,
        thumbnail:true,
        instructor:true,
        ratingAndReviews:true,
        studentsEnrolled:true
      }).populate("instructor").exec();

      return res.status(200).json({
        success:true,
        message:'Data for all courses fetched successfully',
        data: allCourses
      })
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            error: err.message , 
            message:"cannot fetch course data"
        })
    }
}