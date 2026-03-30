import React, { useContext, useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import API from '../api/axios';
import { FaCircleUser } from "react-icons/fa6";
import { usePopup } from '../hooks/usePopup';


const Defprofile = () => {
    const {user, setUser} = useContext(UserContext)
    const location = useLocation();
    const navigate = useNavigate()


    const isOnPage = (pagename)=> {
        return location.pathname.includes(pagename);
    }
    
    useEffect(()=> {
        if(!isOnPage('_profile') && !isOnPage("_pins") && !isOnPage('_boards')) {
            navigate("_boards")
            
        }
    }, [location, navigate])

    useEffect(()=> {
        const fetchProfile = async()=> {
            try{
                const res = await API.get("/profile")
                if(res.data.success) {
                    setUser(res.data.user)
                }
            } catch(err) {
                console.log('Profile fetch error:', err);
                
            }
        }

        fetchProfile()
    }, [])


    
    
  return (
    <div className='DefProfile relative flex flex-col w-full overflow-y-auto bg-white'>
        {!isOnPage('_profile') && (
            <>
            <div className={`pro-top  flex w-full pl-24 ${!user.bio>0 && 'justify-between'}  py-1.5 fixed 0 z-10`}>
                <div className="top-left pt-30.5 w-fit">
                    <h1 className='text-4xl tracking-[-0.015em] font-semibold font-["SF_pro_Bold"]'>Your saved ideas</h1>
                    <div className="pins_boards flex mt-10.5 ml-3 font-['SF_Pro'] color-[#211922] font-semibold gap-6 tracking-wide">
                        {isOnPage("_pins") ? <NavLink to='_pins' className='text-[.95em] underline-offset-9 underline decoration-2 decoration-zinc-700'>Pins</NavLink> :<NavLink to='_pins' className='text-[.95em]'>Pins</NavLink>} 
                        {isOnPage('_boards') ? (<NavLink to='_boards'  className='text-[.95em] underline-offset-9 decoration-zinc-700 decoration-2 underline boards-page'>Boards</NavLink>) : ( <NavLink to='_boards'  className='text-[.95em] boards-page'>Boards</NavLink>)}
                    </div>
                </div>
                <div className="top-right flex pt-27.5 justify-center w-[70%] pl-19   gap-3">
                    <div className="profile_img w-16 h-16 bg-blue-400 rounded-full overflow-hidden flex">
                        {user?.profileImage ? <img className='bg-cover object-cover' src={`http://localhost:8080/uploads/${user.profileImage}`} alt="" /> : <FaCircleUser fill='#dbdbdb' className='w-full bg-white h-full'/>}
                        
                    </div>
                    <div className="user_dets flex flex-col w-fit h-fit mb-3 ">
                        <h1 className='User font-["SF_Pro_Bold"] text-xl'>{user?.name}</h1>
                        <p className='bio text-sm font-["SF_Pro"] text-[#111]'>{user?.bio || ''}</p>
                        <p className='following text-sm font-["SF_Pro_Bold"]'>6 following</p>
                    </div>
                    <div className="more_opt flex py-5 ml-3">
                        <NavLink to='_profile' className='font-["SF_Pro"] text-sm font-semibold text-[#272727] h-fit px-3 py-2 rounded-xl bg-zinc-300' >View profile</NavLink>
                    </div>
                </div>

            </div>
            </>
        )}
            <div className={`boards w-full flex ${isOnPage('_profile') ? 'pt-20' :  'pt-80'} relative overflow-x-hidden pb-4 flex-wrap px-2 h-auto`}>
                
                
                
                <Outlet/>
            </div>
    </div>
  )
}

export default Defprofile