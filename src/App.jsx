import React, { useContext, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from './pages/Home';
import Explore from './pages/Explore';
import { Createpost } from './pages/Createpost';
import Defprofile from './pages/Defprofile';
import Pins from './pages/Pins';
import Profile from './pages/Profile';
import Profile_created from './pages/Profile_created';
import Profile_saved from './pages/profile_saved';
import BoardsPage from './pages/BoardsPage';
import Login_Register from './pages/Login_Register';
import { Toaster } from "react-hot-toast";
import { UserContext } from './context/UserContext';
import Settings from './pages/Settings';
import Edit_Profile from './pages/Edit_Profile';
import Account_management from './pages/Account_management';
import Profile_visibility from './pages/Profile_visibility';


const App = () => {
  const {user} = useContext(UserContext)
  const location = useLocation()
  const navigate = useNavigate()
  
  const isOnPage = (pagename)=>{
    return location.pathname.includes(pagename)
  }
  const isAuthPage = isOnPage("/login") || isOnPage("/register");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && !isAuthPage) navigate("/login", {replace: true});
    else if(token && isAuthPage) navigate("/", {replace:true})
  }, [location.pathname]);


  return (
    <div className='flex h-auto overflow-hidden relative'>
      {isAuthPage ? (
        <Login_Register/>
      ) : (
        <>
        <Sidebar/>
        <div className="main w-full flex flex-col relative pl-18">
          <Navbar/>
          <Routes>
            <Route path='/login' element={<Login_Register/>}/>
            <Route path='/' element={<Home/>} />
            <Route path='/explore' element={<Explore/>}/>
            <Route path='/settings' element={<Settings/>}>
              <Route path='edit-profile' element={<Edit_Profile/>}/>
              <Route path='account-settings' element={<Account_management/>}/>
              <Route path='profile-visibility' element={<Profile_visibility/>}/>
            </Route>
            <Route path={`/${user?.username}`} element={<Defprofile/>}>
              <Route path='_boards' element={<BoardsPage/>}/>
              <Route path='_pins' element={<Pins/>}/>
              <Route path='_profile' element={<Profile/>}>
                <Route path='_created/' element={<Profile_created/>}/>
                <Route path='_saved/' element={<Profile_saved/>}/>
              </Route>
            </Route>
            <Route path={`/${user?.username}/_boards`}/>
            <Route path='/create-pin' element={<Createpost/>}/>
          </Routes>

        </div>
        </>
      )}

      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2500,
          style: {
            background: "#494942",
            color: "#fff",
            fontFamily: "SF Pro, sans-serif",
            fontSize: "15px",
            borderRadius: "17px",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            padding: "15px 22px",
          },
          success: {
            iconTheme: {
              primary: "#34d399", // mint green
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444", // soft red
              secondary: "#fff",
            },
          },
        }}
      />
      
    </div>
  )
}

export default App