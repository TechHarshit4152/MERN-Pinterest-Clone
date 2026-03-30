import React from 'react'
import { FiMoreHorizontal } from 'react-icons/fi';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Cards = (props) => {
  
  return (
    <div className='card cursor-pointer  w-61 px-1 group rounded-2xl break-inside-avoid overflow-hidden mb-6'>
      <div className="img w-full rounded-2xl relative overflow-hidden">

        <div className="absolute inset-0 py-4 px-4 rounded-2xl z-10 bg-[rgba(17,17,17,0.2)] opacity-[0] group-hover:opacity-100 transition duration-100">
          <div className="utils-top gap-1 flex items-center justify-between w-full h-auto">
            <div className="left flex gap-1 hover:bg-[#514e4e]/80 items-center text-white justify-between w-auto py-3 px-3 rounded-xl truncate overflow-hidden">
              <p className="w-[84%] font-['SF_Pro_Bold'] truncate">Important</p>
              <MdOutlineKeyboardArrowDown fontSize={25}/>
            </div>
            <div className="right w-[33%] bg-[#e60024] hover:bg-[#d10023] text-white rounded-xl">
              <button className="p-3 w-full cursor-pointer h-auto font-['SF_Pro_Medium']">Save</button>
            </div>
          </div>
          <div className="utils-btm"></div>

        </div>

        <img src={`http://localhost:8080/uploads/${props.img}`} className='w-full object-cover' alt="" />
        
      </div>
        <div className="dets flex w-full items-baseline justify-between pt-2 px-3">
          <p className='text-[13px] tracking-wide font-semibold text-[#222]  font-["SF_Pro"] leading-tight truncate'>{props.title}</p>
          <FiMoreHorizontal fontSize={14} fontWeight={800} className='cursor-pointer'/>
        </div>
    </div>
  )
}

export default Cards