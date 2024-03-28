const Tag=require("../models/tags")


//CREATE TAG
exports.createTag=async(req,res)=> {
    try{
       
        const {name,description}=req.body;

        if(!name || !description) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })                                                                    
        }
         //create entry in data
         const tagDetails=await Tag.create({
            name:name,
            description:description
         });
         console.log(tagDetails)

         //return response
         return res.status(200).json({
            success:true,
            message: "Tag created successfully"
         })

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
 }


 //GET ALL TAGS

 exports.showAllTags=async(req,res)=> {
    try{
        const allTags=await Tag.find({},{name:true,description:true})
   
                 //return response
                 return res.status(200).json({
                    success:true,
                    message: "All tags returned successfully",
                    allTags
                });
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
 }

 //UPDATE Tag