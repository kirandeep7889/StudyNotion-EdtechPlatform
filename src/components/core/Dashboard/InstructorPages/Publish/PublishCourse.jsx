import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';

const PublishCourse = () => {
   
    const {register,handleSubmit,setValue,getValues}=useForm();
    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(false)
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth) 

  return (
    <div className='rounded-md border-[1px] bg-richblack-800'>
       <p>Publish Course</p>
       <form onSubmit={handleSubmit(onSubmit)}>
           <div>
              <label>
                  Make this Course as Public
              </label>
              <input
              type='checkbox'
              id='public'
              {...register("public")}
              />
           </div>
       </form>
    </div>
  )
}

export default PublishCourse
