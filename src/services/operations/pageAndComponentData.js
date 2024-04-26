import toast from "react-hot-toast"
import { catalogData } from "../apis";
import { apiConnector } from "../apiconnector";


export const getCatalogPageData=async(categoryId)=> {
      const toastId=toast.loading("loading...");
      let result=[];

      try{
         const response=await apiConnector("POST",catalogData.CATALOG_PAGE_DATA_API,{categoryId:categoryId})
          
         if(!response?.data?.success) 
             throw new Error("Could not fetch Category page DATA")
      
        } catch(err) {
            console.log("Catalog page  data api error.." ,err);
            toast.error(err.message);
            result=err.response?.data;

      }

      toast.dismiss(toastId);
      return result;
}