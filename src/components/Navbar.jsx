import React, { useContext, useState } from 'react'
import { RiSearchLine } from 'react-icons/ri';
import { BsChevronDown } from 'react-icons/bs';
import { NavLink, useNavigate } from 'react-router-dom';
import { usePopup } from '../hooks/usePopup';
import { FaCircleUser } from "react-icons/fa6";

import toast from 'react-hot-toast';
import API from '../api/axios';
import { UserContext } from '../context/UserContext';


const Navbar = () => {

  const [allPopups, setallPopups] = useState({active: null})
  const [loading, setloading] = useState(false)
  const {user, setUser} = useContext(UserContext)
  const navigate = useNavigate()
  const logout = usePopup("logout", allPopups, setallPopups)

  const logoutUser =  async(e)=> {
    e.preventDefault()
    setloading(true)

    try {
      const res = await API.get("/logout")

      if(res.data.success) {
        localStorage.clear()
        toast.success("Logged out")
        navigate("/login")
        setUser(null)
      }
    } catch(err) {
      toast.error("Logout failed!")
      console.log(err);
      
    } finally {
      setloading(false)
    }
  }
  return (
    <div className='flex w-[94.5%] fixed overflow-x-auto overflow-y-hidden z-100 bg-white items-center gap-4 p-4 shadow-[0_8px_4px_-9px_rgba(0,0,0,0.25)]'>
      <div className="input flex w-[92.45%] bg-[#e4e4de] hover:bg-[#cfcfcf] pl-4 rounded-[0.8rem] gap-2 items-center">
        <RiSearchLine color='#737370' fontSize={18} />
        <input type="text" placeholder='Search' className=' outline-0 py-3 w-full font-["SF_Pro"] text-[#222] text-md bg-transparent' />
      </div>
      <div className="account flex items-center gap-3">
        <div className='overflow-hidden w-[33px] h-[33px] rounded-full'>
          <NavLink to={`/${user?.username}`} className='w-[33px] overflow-hidden h-[33px]'>
            {user?.profileImage ? <img className='bg-cover w-full h-full object-cover' src={`http://localhost:8080/uploads/${user.profileImage}`} alt="" /> : <FaCircleUser fill='#dbdbdb' className='w-full bg-white h-full'/>}
          </NavLink>
        </div>
        <div className="logout flex flex-col ">
          <button className='' ref={logout.triggerRef} onClick={logout.toggle}><BsChevronDown fontSize={15} color='#898986'  className='cursor-pointer '/></button>
          {logout.isOpen ? (<div className='fixed top-15 right-8 w-68 h-56 py-2 rounded-xl shadow-[0_8px_10px_3px_rgba(0,0,0,0.25)] pl-2 bg-white'>
            <p className='text-xs text-[#424242] font-["SF_Pro_Medium"] pl-3  py-3'>Currently in</p>
            <div className="account-info  hover:bg-[#eeeeee]  w-full pl-3 rounded-xl flex py-2 gap-2">
              <div className="img-circle w-15 h-15 rounded-full overflow-hidden">
                {user?.profileImage ? <img className='bg-cover w-full h-full object-cover' src={`http://localhost:8080/uploads/${user.profileImage}`} alt="" /> : <FaCircleUser fill='#dbdbdb' className='w-full bg-white h-full'/>}
              </div>
              <NavLink to={`${user?.username}`}><div className="user-dets w-[185px] overflow-hidden">
                <h1 className='font-["SF_Pro_Bold"]'>{user?.name}</h1>
                <h2 className='text-sm font-["SF_Pro"] text-[#555555]'>Personal</h2>
                <p className='text-sm w-[178px] truncate font-["SF_Pro"] text-[#555555]'>{user.email}</p>
              </div></NavLink>
            </div>
            <div ref={logout.ref} className="logout-btn mt-1 pr-2">
              <p className='text-xs text-[#424242] font-["SF_Pro_Medium"] pl-3 py-3'>Your accounts</p>
              <button disabled={loading} onClick={logoutUser} className='px-3 w-full rounded-xl text-start py-2 cursor-pointer hover:bg-[#e4e4e4] font-["SF_Pro_Medium"]'>{loading ? 'Logging out...' : 'Log out'}</button>
            </div>
          </div>): (<></>)}
        </div>
      </div>
    </div>
  )
}

export default Navbar