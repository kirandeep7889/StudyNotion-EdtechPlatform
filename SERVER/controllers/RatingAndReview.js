
const ratingAndReview=require("../models/RatingAndReview");
const Course=require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");
const { default: mongoose } = require("mongoose");

//createRating
exports.createRating=async(req,res)=> {
    try{
     //get userid
     const userId=req.user.id;
     //fetch data from req body
     const {rating,review,courseId}=req.body;
     //check if user is enrolled or not
     const  courseDetails=await Course.findOne(
        { _id:courseId,
           studentsEnrolled: {elemMatch: {$eq: userId}}}
        );

      if(!courseDetails) {
        res.status(404).json({
            success:false,
            message:'student is not enrolled in course'
        })
      }
     //check if user already reviewd or not
       const alreadyReviewed=await RatingAndReview.findOne({
        user: userId,
        course: courseId
       });

       if(alreadyReviewed) {
        res.status(403).json({
            success:false,
            message:'course is already reviewed by this user'
        })
       }
     //create rating

     const ratingReview=RatingAndReview.create({
        rating,review,
        course:courseId,
        user:userId
     });
     //update course with rating and review
      const updatedCourseDetails=await Course.findByIdAndUpdate({_id:courseId},{
        $push: {
            ratingAndReviews: ratingReview._id
        },
        },
        { new:true }
     );console.log(updatedCourseDetails);


     //return response
       return res.status(200).json({
          success:true,
          message:'rating and review created successfully',
          ratingReview
       })
    }catch(err) {
       console.log(err);
       return res.status(500).json({
        success:false,
        message:err.message
       })
    }

}

//getAverageRating
exports.getAverageRating=async(req,res)=> {
    try{
       // get course ID
       const {courseId}=req.body;

       //calculate avg rating
       const result=await RatingAndReview.aggregate([
           {
               $match: {
                    course: new mongoose.Types.ObjectId(courseId),
               }
           }, {
               $group : {
                  _id :null,
                  averageRating: {
                    $avg :"$rating"
                  }
               }
           }
       ]);

       //return rating
       if(result.length>0) {
          return res.status(200).json({
              success:true,
              averageRating: result[0].averageRating,
          });
       }
       //if no rating/review exists
       return res.status(200).json({
        success: true,
        message: 'Average rating is zero, no ratings given till now',
        averageRating: 0
       })
    }

catch (err) {
    console.log(err);
    return res.status(500).json({
     success:false,
     message:err.message
    })
}

}
//getAllRating and reviews 

exports.getAllRating=async(req,res)=> {
    try{
       const allReviews=await ratingAndReview.find({})
                                             .sort({rating:"desc"})
                                             .populate({
                                                path: "user",
                                                select:"firstName lastName email image" 
                                             })
                                             .populate({
                                                path: "course",
                                                select :"courseName"
                                             })
                                             .exec();

                    return res.status(200).json({
                        success:true,
                        message:"all reviews fetched successfully",
                        data:allReviews
                    })                         
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
         success:false,
         message:err.message
        })
    }
}