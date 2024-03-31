const Section=require("../models/section");
const Course=require("../models/Course");


exports.createSection = async(req,res) => {
    try{
      //data fetch
      const {sectionName,courseId}=req.body;

      //data validaiton
      if(!sectionName || !courseId) {
           return res.status(400).json({
            success:false,
            message: "Missing Properties"
           });

           //creATE Section
           const newSection=await Section.create({sectionName});

           //update course with section ObjectID
           const updatedCourseDetails=await Course.findByIdAndUpdate({courseId},
            {
                $push: {
                    courseContent: newSection._id
                },
            },{
                new:true
            }
            )//todo:use populate to replace sections/subsections both in the updatedCourseDetails
      };
        
         //send response
         return res.status(200).json({
            success:true,
            message:"Section Created Successfully",
            updatedCourseDetails
         })

    }
    catch(err) {
        return res.status(400).json({
            success:false,
            message: "Unable to create section"
        })
    }
}


//update controller

exports.updateSection=async(req,res)=> {
    try{
         //data fetch
         const {updatedSectionName,sectionId}=req.body;

         //validation
         if(!updatedSectionName || !sectionId) {
            return res.status(400).json({
                success:false,
                message: "Missing Properties"
               });
         }

         //update data
         const updatedSection=await Section.findByIdAndUpdate(sectionId,{updatedSectionName},{new:true})

         //return response
         return res.status(200).json({
            success:true,
            message:"Section updated successfully",
         })


    }
    catch(err) {
        return res.status(400).json({
            success:false,
            message: "Unable to update section"
        }) 
    }
}



//delete controller

exports.deleteSection=async(req,res)=> {
    try{
        const {sectionId}=req.params;
        
    await Section.findByIdAndDelete(sectionId);


    return res.status(200).json({
        success: true,
        message: "Section Deleted Successfully"
    })
        
    }
    catch(err) {
        return res.status(400).json({
            success:false,
            message: "Unable to delete section"
        })      
    }
}