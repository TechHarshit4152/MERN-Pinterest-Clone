import React, { useContext, useEffect } from 'react'
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { FaCircleUser } from "react-icons/fa6";
import toast from 'react-hot-toast';


const Profile = () => {
  
  const navigate = useNavigate();
  const location = useLocation()
  const {user} = useContext(UserContext)

  const isOnPage = (pagename)=> {
      return location.pathname.includes(pagename);
  }

  useEffect(()=> {
    if(!isOnPage("_saved") && !isOnPage("_created")) {
      navigate("_saved")
      toast("This is how your profile looks to others")
    }
  }, [navigate, location])
  return (
    <div className='w-full flex flex-col pr-3 h-fit'>
        <div className="user_dets gap-2 flex w-full relative flex-col items-center pt-19">
            <button onClick={()=> navigate(-1)} className='absolute left-0 top-1 hover:bg-zinc-100 p-3 cursor-pointer rounded-xl'><HiOutlineArrowLeft fontSize={28} fontWeight='300'/></button>
            <div className="Profile_img w-30 h-30 rounded-full overflow-hidden flex items-center justify-center">
              {user?.profileImage ? <img className='w-full PRO_IMG h-full object-cover bg-cover'  src={`http://localhost:8080/uploads/${user.profileImage}`} alt="" /> : <FaCircleUser fill='#dbdbdb' className='w-full bg-white h-full'/>}
              
            </div>
            <h1 className='text-4xl mt-2 font-["SF_Pro_Bold"]'>{user?.name}</h1>

            <p className='font-["SF_Pro"] w-[470.23px] wrap-normal text-center leading-tight'>{user?.bio}</p>
              

            <p className='user_name gap-1 text-[#62625b] flex font-["SF_Pro"] text-sm text-center items-center'><span><svg fill='#62625b' aria-label="pinterest" className="gUZ U9O BNH" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M7.54 23.15q-.2-2.05.26-3.93L9 14.04a7 7 0 0 1-.35-2.07c0-1.68.81-2.88 2.09-2.88.88 0 1.53.62 1.53 1.8q0 .57-.23 1.28l-.52 1.72q-.15.5-.15.92c0 1.2.91 1.87 2.08 1.87 2.09 0 3.57-2.16 3.57-4.96 0-3.12-2.04-5.12-5.05-5.12-3.36 0-5.49 2.19-5.49 5.24 0 1.22.38 2.36 1.11 3.14-.24.41-.5.48-.88.48-1.2 0-2.34-1.69-2.34-4 0-4 3.2-7.17 7.68-7.17 4.7 0 7.66 3.29 7.66 7.33s-2.88 7.15-5.98 7.15a3.8 3.8 0 0 1-3.06-1.48l-.62 2.5a11 11 0 0 1-1.62 3.67A11.98 11.98 0 0 0 24 12a11.99 11.99 0 1 0-24 0 12 12 0 0 0 7.54 11.15"></path></svg></span>
            <span >{user?.username}</span>
            <span className='mb-[5px]'>.</span>
            <span>he/him</span>
            </p>

            <button className='font-["SF_Pro_Bold"]'>6 following</button>

            <NavLink to='/settings/edit-profile' className='font-["SF_Pro_medium"] text-md mt-2 bg-[#dcddd7] px-5 py-3 rounded-2xl hover:bg-[#d3d3cd]'>Edit profile</NavLink>

            <div className="more-options mt-8 font-['SF_Pro_Medium'] flex gap-6 text-black  font-medium">
              {!isOnPage("_created") ? (<NavLink to='_created/'>Created</NavLink>) : (<NavLink to='_created/' className='underline underline-offset-8 decoration-2 decoration-[#232323]'>Created</NavLink>)}
              {!isOnPage("_saved") ? (<NavLink to='_saved/'>Saved</NavLink>) : (<NavLink to='_saved/' className='underline underline-offset-8 decoration-[#232323] decoration-2'>Saved</NavLink>)}
              
            </div>
        </div>
        <div className="_saved_or_created py-7 w-full">
          <Outlet/>
        </div>

    </div>
  )
}

export default Profile