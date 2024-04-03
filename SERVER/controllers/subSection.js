const subSection=require("../models/subSection");
const Section=require("../models/section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


exports.createSubsection=async(req,res)=> {
    try{
      //fetch data
      const {sectionId,title,timeDuration,description}=req.body;

      //extract file/video
      const video=req.files.videoFile;

      //validation
      if(!sectionId || !title || !timeDuration || !description || !video) {
           return res.status(400).json({
            success: false,
            message: "All fields are required"
           });
          }
      //  upload video on cloudinary
       const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);    
       
      //create a sub-section
      const subSectionDetails=await subSection.create({
        title: title,
        timeDuration:timeDuration,
        description:description,
        videoUrl:uploadDetails.secure_url
      });

      //update section with this sub section ObjectId
       const updatedSection=await Section.findByIdAndUpdate(
        {_id:sectionId},
        {$push: {
          subSection:subSectionDetails._id
        }},
        {new:true}
        //todo:log updated section section here,after adding populate query
        );
        console.log(updatedSection)


        //return response
        return res.status(200).json({
          success:true,
          message:'subsection created successfully',
          updatedSection
        })

      }
    catch (err) {
      return res.status(400).json({
        success:false,
        message: "Unable to create sub-section"
    })
}

}

//todo:updatesubsection
