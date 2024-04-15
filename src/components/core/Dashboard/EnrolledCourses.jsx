import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const EnrolledCourses = () => {
   
    const {token}=useSelector((state)=>state.auth)
    const [enrolledCourses,setEnrolledCourses]=useState(null)

    const getEnrolledCourses=async()=> {
        try{
          const response=await getUserEnrolledCourses(token)
          setEnrolledCourses(response)
        }catch(e) {
            console.log("Unable to fetch enrolled courses")
        }
    }

    useEffect(()=>{
            getEnrolledCourses();
    },[])
  return (
    <div>
      <div>Enrolled Courses</div>
      {
        !enrolledCourses ? (
            <div>
                loading...
            </div>   
        ) :  !enrolledCourses.length ? (
            <p>
                You have not enrolled in any course yet.
            </p>
        ) : (
            <div>
                <div>
                    <p>Course</p>
                    <p></p>
                    <p></p>
                </div>
            </div>    
        )
      }
    </div>
  )
}

export default EnrolledCourses
