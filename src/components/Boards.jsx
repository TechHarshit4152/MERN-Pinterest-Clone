import React from 'react'

const Boards = ({board}) => {
  
  
  return (
    <div className="boardCard flex flex-col gap-2">
        <div className='w-59 rounded-2xl h-39 bg-blue-400 Board_3_imgs'>
        </div>
        <div className="dets ml-2 gap-[.13rem] flex flex-col">
            <h2 className=' text-xl font-["SF_Pro_Bold"]'>{board.boardName}</h2>
            <p className='text-[.72em] font-["SF_Pro"]'>{board.posts?.length || '0'} Pins <span className='font-["SF_Pro_Medium"] text-zinc-500 ml-2'>1d</span></p>
        </div>
    </div>
  )
}

export default Boards