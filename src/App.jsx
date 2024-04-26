
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import ForgotPassword from './Pages/ForgotPassword'
import UpdatePassword from './Pages/UpdatePassword'
import About from './Pages/About'
import ContactUs from './Pages/ContactUs'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import OpenRoute from './components/core/Auth/OpenRoute'
import VerifyEmail from './Pages/VerifyEmail'
import MyProfile from './components/core/Dashboard/MyProfile'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import DashBoard from './Pages/DashBoard'
import { useSelector } from 'react-redux'
import AddCourse from "./components/core/Dashboard/InstructorPages/AddCourse.jsx"
import { ACCOUNT_TYPE } from './utils/constants.jsx'
import Catalog from './Pages/Catalog.jsx'
import Navbar from './components/common/Navbar.jsx'
import Settings from './components/core/Dashboard/Settings.jsx'
import EditCourse from './components/core/Dashboard/InstructorPages/EditCourse.js'
import InstructorDashboard from './components/core/Dashboard/InstructorPages/InstructorDashboard.js'
import CoursePage from './Pages/CoursePage.jsx'
import EnrolledCourses from './components/core/Dashboard/StudentPages/EnrolledCourses.jsx'
import VideoDetails from './components/core/Dashboard/StudentPages/VideoDetails.js'
import ViewCourse from './Pages/ViewCourse.jsx'
import Cart from './Pages/Cart.jsx'
import MyCourses from "./components/core/Dashboard/InstructorPages/MyCourses.jsx"

function App() {
  const user = useSelector((state) => state.profile);
  console.log(user)

        return (
          <div className='w-screen min-h-screen bg-richblack-900  flex flex-col font-inter'>
             <Navbar/>
             <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path='/catalog/:catalogName' element={<Catalog/>}/>
                  <Route path="/courses/:courseId" element={<CoursePage/>}/>
                  <Route path="/about" element={<About/>}/>
                  <Route path="/login" element={<OpenRoute><Login/></OpenRoute>}/>
                  <Route path="/signup" element={<OpenRoute><Signup/></OpenRoute>}/>
                  <Route path="/forgot-password" element={<OpenRoute><ForgotPassword/></OpenRoute>}/>
                  <Route path="/update-password/:id" element={<UpdatePassword/>}/>
                  <Route path="/verify-email" element={<OpenRoute><VerifyEmail/></OpenRoute>}/>
                  <Route path="/contact" element={<ContactUs/>}/>
                   <Route element={<PrivateRoute><DashBoard/></PrivateRoute>}>
                  <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
                  <Route path="/dashboard/settings" element={<Settings/>}/>
                  {
                    user?.user?.accountType === ACCOUNT_TYPE.STUDENT && (
                      <>
                        <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
                        <Route path="/dashboard/cart" element={<Cart/>}/>
                      </>
                      )
                  }
                  {
                    user?.user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                      <>
                        <Route path="/dashboard/add-course" element={<AddCourse/>}/>
                        <Route path="/dashboard/my-courses" element={<MyCourses/>}/>
                        <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>}/>
                        <Route path="/dashboard/instructor" element={<InstructorDashboard/>}/>
                      </>
                      )
                  }
                </Route>
                <Route element={<PrivateRoute><ViewCourse/></PrivateRoute>}>
                <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails/>}/>
              </Route>

             </Routes>
          </div>
        )
}

export default App 
