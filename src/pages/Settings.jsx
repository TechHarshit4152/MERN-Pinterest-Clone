import React, { useContext, useEffect } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Settings = () => {
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()
    const location = useLocation()
    const isOnPage = (pagename)=> {
      return location.pathname.includes(pagename);
    }

    useEffect(()=> {
        if(!isOnPage('edit-profile') && !isOnPage('account-settings') && !isOnPage('profile-visibility')) {
            navigate('edit-profile')
        }
    }, [location, navigate])
  return (
    <div className='pt-20 MAIN-SETTINGS relative w-full flex h-screen px-5'>
        <div className="settings-sidebar h-full w-[24%] flex flex-col py-8.5">
            {isOnPage("edit-profile") ? <NavLink to='edit-profile' className='font-["SF_Pro_Bold"] text-md py-3 hover:bg-[#ebebeb] underline underline-offset-12 decoration-[#313131] decoration-3 px-2 rounded-lg'>Edit profile</NavLink> : <NavLink to='edit-profile' className='font-["SF_Pro_Bold"] text-md py-3 hover:bg-[#ebebeb] px-2 rounded-lg'>Edit profile</NavLink>}

            {isOnPage("account-settings") ? <NavLink to='account-settings' className='font-["SF_Pro_Bold"] text-md py-3 hover:bg-[#ebebeb] underline underline-offset-12 decoration-[#313131] decoration-3 px-2 rounded-lg'>Account management</NavLink> : <NavLink to='account-settings' className='font-["SF_Pro_Bold"] text-md py-3 hover:bg-[#ebebeb] px-2 rounded-lg'>Account management</NavLink>}

            {isOnPage("profile-visibility") ? <NavLink to='account-settings' className='font-["SF_Pro_Bold"] text-md py-3 hover:bg-[#ebebeb] underline underline-offset-12 decoration-[#313131] decoration-3 px-2 rounded-lg'>Profile visibility</NavLink> : <NavLink to='profile-visibility' className='font-["SF_Pro_Bold"] text-md py-3 hover:bg-[#ebebeb] px-2 rounded-lg'>Profile visibility</NavLink>}

        </div>
        <div className="settings-page w-[76%] ">
            <Outlet/>
        </div>
    </div>
  )
}

export default Settings