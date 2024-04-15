import React from 'react'
import NavBar from '../components/common/NavBar'

function Error() {
  return (
    <div>
      <NavBar backgroundColor={1}/>
      <div className=' flex justify-center w-screen h-screen items-center'>
        <p className=' text-3xl text-white'>Error - 404 Not Found</p>
      </div>
    </div>
  )
}

export default Error