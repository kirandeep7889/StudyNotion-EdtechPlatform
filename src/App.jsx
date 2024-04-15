
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import ForgotPassword from './Pages/ForgotPassword'
import UpdatePassword from './Pages/UpdatePassword'
import About from './Pages/About'
import NavBar from "./components/common/NavBar"
import ContactUs from './Pages/ContactUs'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import OpenRoute from './components/core/Auth/OpenRoute'
import VerifyEmail from './Pages/VerifyEmail'
import MyProfile from './components/core/Dashboard/MyProfile'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import DashBoard from './Pages/DashBoard'
import AddCourse from './components/core/Dashboard/InstructorPages/AddCourse'

function App() {
        return (
          <div className='w-screen min-h-screen bg-richblack-900  flex flex-col font-inter'>
             <NavBar/>
             <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/about" element={<About/>}/>
                  <Route path="/login" element={<OpenRoute><Login/></OpenRoute>}/>
                  <Route path="/signup" element={<OpenRoute><Signup/></OpenRoute>}/>
                  <Route path="/forgot-password" element={<OpenRoute><ForgotPassword/></OpenRoute>}/>
                  <Route path="/update-password/:id" element={<UpdatePassword/>}/>
                  <Route path="/verify-email" element={<OpenRoute><VerifyEmail/></OpenRoute>}/>
                  <Route path="/contact" element={<ContactUs/>}/>
                  <Route element={<PrivateRoute><DashBoard/></PrivateRoute>}>
                    <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
                   </Route>
                   <Route path="/dashboard/add-course" element={<AddCourse/>}/>

             </Routes>
          </div>
        )
}

export default App
