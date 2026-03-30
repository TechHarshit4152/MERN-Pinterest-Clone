import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import emptyPinsImg from '../assets/ill.palette.spot.light.svg.webp'
import { UserContext } from '../context/UserContext'

const Profile_created = () => {
  const {user, setUser} = useContext(UserContext)
  const hasPins = user?.posts && user?.posts.length>0
  const BASE_URL =  "http://localhost:8080";
  return (
    <>
    <div className="pins  w-full columns-5">

      {hasPins && user?.posts.map((pins, i) => (<div className='px-2 mt-6 w-60 break-inside-avoid'><img src={`${BASE_URL}/images/uploads/${pins.image}`}  className='w-full bg-cover rounded-xl h-auto' alt="" /></div>))}
    </div>
    {!hasPins &&
      <div className='mt-10 flex w-full flex-col items-center'>
        <div className="not_created_pins mt-6 flex flex-col w-full   items-center ">

          <img className='w-47 h-47' src={emptyPinsImg} alt="" />
          <h1 className='font-["SF_Pro_Bold"] text-xl'>Create your first Pin</h1>
          <p className='text-center font-["SF_Pro"] text-sm'>Found something new? Create Pins with images, <br /> videos and links to share your inspiration—or <br /> save it just for you.</p>
          <NavLink to='/create-pin' className='py-2 px-3 mt-3 bg-[#e60024] text-white font-["SF_Pro_medium"] text-sm rounded-xl'>Create Pin</NavLink>
        </div>
      </div>}
    </>
  )
}

export default Profile_created