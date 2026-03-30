import React, { useContext, useEffect, useState } from 'react'
import Boards from '../components/Boards'
import { UserContext } from '../context/UserContext'
import { usePopup } from '../hooks/usePopup'
import API from '../api/axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


const BoardsPage = () => {
  const {user, setUser} = useContext(UserContext)
  const [allPopups, setallPopups] = useState({active: null})
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState('')
  const [boardName, setboardName] = useState('')
  const userId = user._id
  const navigate = useNavigate()

  const boards = usePopup("boards", allPopups, setallPopups)
  const hasBoards = user?.boards && user?.boards.length>0


  const handleSubmit = async (e)=> {
    e.preventDefault()
    setloading(true)
    seterror('')

    try {
      const res = await API.post("/createboard", {boardName, userId})

      if(res.data.success) {
        setUser(res.data.user)
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(res.data.user))
        toast.success("Board created")
        navigate(`/${res.data.user?.username}`)
      }
    } catch(err) {
      console.log(err);
      
    } finally {
      setloading(false)
    }
  }
  
  return (
    <>
    <div className="BOARDSPAGE relative flex flex-col w-full" >
        <button ref={boards.triggerRef} onClick={boards.toggle} className='bg-[#e60024] right-5 bottom-65 absolute cursor-pointer w-fit text-white font-["SF_Pro"] text-sm py-3 px-4 rounded-xl mt-2'>Create a board</button>

        <div className="has-no-board" >
          {!hasBoards && <div className='flex flex-col items-center w-full'>
              <img src="https://s.pinimg.com/gestalt/illustrations/v1/ill.pinboard.spot.light.svg.webp" className='w-[186px] h-[186px]' alt="" />
              <h1 className='font-["SF_Pro_Bold"] text-xl'>Organize your ideas</h1>
              <p className='w-[310px] text-sm font-["SF_Pro"] text-center'>Pins are sparks of inspiration. Boards are where they live. Create boards to organize your Pins your way.</p>
              <button   ref={boards.triggerRef} onClick={boards.toggle} className='bg-[#e60024] text-white cursor-pointer font-["SF_Pro"] text-sm py-2 px-3 rounded-xl mt-2'>Create a board</button>
            </div>} 
          {boards.isOpen && <div  className='fixed top-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center -translate-y-1/2 z-1000 w-full h-screen bg-black/20'>
            <div  ref={boards.popupRef} className="create-a-board items-center w-120 h-80 bg-white rounded-xl flex flex-col p-6 gap-4">
              <h1 className='text-3xl font-["SF_Pro_Bold"]'>Create Board</h1>
              <form onSubmit={handleSubmit} className='flex  flex-col w-full'>
                <label htmlFor="boardname" className='text-sm text-[#222]'>Name</label> 
                <input type="text" onChange={(e)=> {setboardName(e.target.value)}} value={boardName} name="" className='px-4 py-3 border rounded-2xl mt-2 font-["SF_Pro_Medium"] border-[#979797] outline-0' id="boardname" placeholder='Like "Places to Go" or "Recipes to make"' />
                <button  disabled={loading} type='submit' className='bg-[#e60024] text-white px-4 w-fit font-["SF_Pro_Bold"] mt-10 py-3 rounded-2xl cursor-pointer'>{loading ? 'Creating...' : 'Create'}</button>
              </form>
            </div>
          </div>}
        </div>
        <div className="user-boards flex w-full h-auto overflow-x-hidden flex-wrap gap-4">

          {hasBoards && user?.boards.map((boards, i)=> (<Boards key={i} board={boards}/>))}
        </div>
    </div>
      
    </>
  )
}

export default BoardsPage