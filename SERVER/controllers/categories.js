const category = require("../models/category");
const Tag=require("../models/category")


//CREATE TAG
exports.createCategory=async(req,res)=> {
    try{
       
        const {name,description}=req.body;

        if(!name || !description) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })                                                                    
        }
         //create entry in data
         const categoryDetails=await category.create({
            name:name,
            description:description
         });
         console.log(categoryDetails)

         //return response
         return res.status(200).json({
            success:true,
            message: "Category created successfully"
         })

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
 }


 //GET ALL CATEGORTIES

 exports.showAllCategory=async(req,res)=> {
    try{
        const allTags=await category.find({},{name:true,description:true})
   
                 //return response
                 return res.status(200).json({
                    success:true,
                    message: "All categories returned successfully",
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

 //categoryPageDetails

 exports.categoryPageDetails=async (req,res)=> {
      try{
             //get categoryId
             const {categoryId}=req.body;  
            
             //validation 
             if(!categoryId) {
                return res.status(400).json({
                    success:false,
                    message: "Category Id not found"
                })
             }
             //get courses for specified categoryId
              const selectedCategory=await category.findById(categoryId)
                                                .populate("courses")
                                                .exec();

               //validation 
               if(!selectedCategory) {
                    return res.status(404).json({
                        success:false,
                        message: 'Data not found'
                    })
               }                                 
             //get courses for different categories
               const differentCategories=await category.find({
                                                             _id: {$ne:categoryId},   
                                                            })
                                                            .populate("courses")
                                                            .exec();
             //get top selling courses

             //return response
             return res.status(200).json({
                success:true,
                data: {
                    selectedCategory,
                    differentCategories
                }
             })
      }
      catch(err) {
        console.log(err);
        return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: err.message,
		});    
      }
 }