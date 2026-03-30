import React, { useCallback, useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { usePopup } from '../hooks/usePopup'
import { UserContext } from '../context/UserContext'

const Sidebar = () => {

  const [allPopups, setallPopups] = useState({active: null})
  const bell = usePopup("bell", allPopups, setallPopups)
  const {user} = useContext(UserContext)
  const messages = usePopup("messages", allPopups, setallPopups)
  const settings = usePopup("settings", allPopups, setallPopups)

  return (
    <div className='w-18 flex flex-col items-center h-screen border-r justify-between fixed bg-white overflow-x-hidden z-698 overflow-y-auto border-zinc-200 py-7 '>
        <div className="nav-links flex flex-col items-center h-fit gap-12">

            <NavLink to='/' className='navlink-item'><svg aria-hidden="true" aria-label="" className="gUZ U9O KDM " height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M7.54 23.15q-.2-2.05.26-3.93L9 14.04a7 7 0 0 1-.35-2.07c0-1.68.81-2.88 2.09-2.88.88 0 1.53.62 1.53 1.8q0 .57-.23 1.28l-.52 1.72q-.15.5-.15.92c0 1.2.91 1.87 2.08 1.87 2.09 0 3.57-2.16 3.57-4.96 0-3.12-2.04-5.12-5.05-5.12-3.36 0-5.49 2.19-5.49 5.24 0 1.22.38 2.36 1.11 3.14-.24.41-.5.48-.88.48-1.2 0-2.34-1.69-2.34-4 0-4 3.2-7.17 7.68-7.17 4.7 0 7.66 3.29 7.66 7.33s-2.88 7.15-5.98 7.15a3.8 3.8 0 0 1-3.06-1.48l-.62 2.5a11 11 0 0 1-1.62 3.67A11.98 11.98 0 0 0 24 12a11.99 11.99 0 1 0-24 0 12 12 0 0 0 7.54 11.15"></path></svg></NavLink>

            <NavLink to='/' className='navlink-item'>{({isActive}) => isActive ? ( <svg aria-hidden="true" aria-label="" className="gUZ U9O Uvi" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M9.59.92a3.63 3.63 0 0 1 4.82 0l7.25 6.44A4 4 0 0 1 23 10.35v8.46a3.9 3.9 0 0 1-3.6 3.92 106 106 0 0 1-14.8 0A3.9 3.9 0 0 1 1 18.8v-8.46a4 4 0 0 1 1.34-3zM12 16a5 5 0 0 1-3.05-1.04l-1.23 1.58a7 7 0 0 0 8.56 0l-1.23-1.58A5 5 0 0 1 12 16"></path></svg> ): (<svg aria-hidden="true" aria-label="" className="gUZ U9O Uvi" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M4.6 22.73A107 107 0 0 0 11 23h2.22c2.43-.04 4.6-.16 6.18-.27A3.9 3.9 0 0 0 23 18.8v-8.46a4 4 0 0 0-1.34-3L14.4.93a3.63 3.63 0 0 0-4.82 0L2.34 7.36A4 4 0 0 0 1 10.35v8.46a3.9 3.9 0 0 0 3.6 3.92M13.08 2.4l7.25 6.44a2 2 0 0 1 .67 1.5v8.46a1.9 1.9 0 0 1-1.74 1.92q-1.39.11-3.26.19V16a4 4 0 0 0-8 0v4.92q-1.87-.08-3.26-.19A1.9 1.9 0 0 1 3 18.81v-8.46a2 2 0 0 1 .67-1.5l7.25-6.44a1.63 1.63 0 0 1 2.16 0M13.12 21h-2.24a1 1 0 0 1-.88-1v-4a2 2 0 1 1 4 0v4a1 1 0 0 1-.88 1"></path></svg>)}</NavLink>

            <NavLink to='/explore' className='navlink-item'>{({isActive})=> isActive ? ( <svg aria-hidden="true" aria-label="" className="gUZ U9O Uvi" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 14a12 12 0 1 0 0-24 12 12 0 0 0 0 24M8.8 7.24l8-1.6a1.32 1.32 0 0 1 1.56 1.55l-1.6 8a2 2 0 0 1-1.57 1.57l-8 1.6a1.32 1.32 0 0 1-1.55-1.55l1.6-8A2 2 0 0 1 8.8 7.24"></path></svg> ) : (<svg aria-hidden="true" aria-label="" className="gUZ U9O Uvi" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4M9.42 7.24a3 3 0 0 0-2.18 2.18L5.7 15.57a2.25 2.25 0 0 0 2.73 2.73l6.15-1.54a3 3 0 0 0 2.18-2.18l1.54-6.15a2.25 2.25 0 0 0-2.73-2.73zm6.94.7-1.54 6.15a1 1 0 0 1-.73.73l-6.15 1.54a.25.25 0 0 1-.3-.3L9.18 9.9a1 1 0 0 1 .73-.73l6.15-1.54a.25.25 0 0 1 .3.3M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0"></path></svg>)}</NavLink>

            <NavLink to={`/${user?.username}/_boards`} className='navlink-item'> 
              {({isActive})=> 
                isActive ? 
                (<svg aria-hidden="true" aria-label="" className="gUZ U9O Uvi" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M11 23H5a4 4 0 0 1-4-4V5a4 4 0 0 1 4-4h6zm12-4a4 4 0 0 1-4 4h-6V13h10zM19 1a4 4 0 0 1 4 4v6H13V1z"></path></svg>

                ) : (
                  <svg aria-hidden="true" aria-label="" className="gUZ U9O Uvi" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M23 5a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4zm-10 6V3h6a2 2 0 0 1 2 2v6zm8 8a2 2 0 0 1-2 2h-6v-8h8zM5 3h6v18H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2"></path></svg>
                )
              } 
            </NavLink>

            <NavLink to='/create-pin' className='navlink-item'>{({isActive})=> isActive ? (<svg aria-hidden="true" aria-label="" className="gUZ U9O Uvi" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M1 5a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4zm10 6H6v2h5v5h2v-5h5v-2h-5V6h-2z"></path></svg>) : (<svg aria-hidden="true" aria-label="" className="gUZ U9O Uvi" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M11 11H6v2h5v5h2v-5h5v-2h-5V6h-2zM5 1a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4zm16 4v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2"></path></svg>)}</NavLink>
            <div  ref={bell.triggerRef} className='flex flex-col'>
              <a href='#' onClick={bell.toggle}  className='navlink-item'> 
                {bell.isOpen ? <svg aria-hidden="true" aria-label="" className="gUZ U9O Uvi" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.54 14.24A3.15 3.15 0 0 0 23.66 17H24v2h-8v1h-.02a3.4 3.4 0 0 1-3.38 3h-1.2a3.4 3.4 0 0 1-3.38-3H8v-1H0v-2h.34a3.15 3.15 0 0 0 3.12-2.76l.8-6.41a7.8 7.8 0 0 1 15.48 0zM10 19.6c0 .77.63 1.4 1.4 1.4h1.2c.77 0 1.4-.63 1.4-1.4a.6.6 0 0 0-.6-.6h-2.8a.6.6 0 0 0-.6.6"></path></svg> : <svg aria-hidden="true" aria-label="" className="gUZ U9O Uvi" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16 19h8v-2h-.34a3.15 3.15 0 0 1-3.12-2.76l-.8-6.41a7.8 7.8 0 0 0-15.48 0l-.8 6.41A3.15 3.15 0 0 1 .34 17H0v2h8v1h.02a3.4 3.4 0 0 0 3.38 3h1.2a3.4 3.4 0 0 0 3.38-3H16zm1.75-10.92.8 6.4c.12.95.5 1.81 1.04 2.52H4.4c.55-.7.92-1.57 1.04-2.51l.8-6.41a5.8 5.8 0 0 1 11.5 0M13.4 19c.33 0 .6.27.6.6 0 .77-.63 1.4-1.4 1.4h-1.2a1.4 1.4 0 0 1-1.4-1.4c0-.33.27-.6.6-.6z"></path></svg>}
              </a>

              {bell.isOpen ? (<div ref={bell.popupRef} className='fixed top-4 left-22 z-999 w-98 py-4.5 px-4 rounded-2xl overflow-y-auto h-[95vh] shadow-[0_8px_10px_3px_rgba(0,0,0,0.25)] bg-white'>
                <div className="updates w-full h-auto overflow-x-hidden">
                  <h1 className='font-["SF_Pro_Bold"] text-xl'>Updates</h1>
                  <div className="new mt-4">
                    <h1 className='font-["SF_Pro_bold"] text-xl'>New</h1>
                  </div>
                  <div className="seen mt-4">
                    <h1 className='font-["SF_Pro_bold"] text-xl'>Seen</h1>

                  </div>
                  
                </div>
              </div>) : (<></>)}
            </div>
            <div ref={messages.triggerRef}>
              <a href="#"  className='navlink-item' onClick={messages.toggle}>
                {messages.isOpen ? <svg aria-hidden="true" aria-label="" className="gUZ U9O Uvi" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M17 22.35A11.5 11.5 0 1 1 22.36 17l.64 3.7a2 2 0 0 1-2.3 2.3zM7 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m5 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m5-3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"></path></svg> : <svg aria-hidden="true" aria-label="" className="Hn_ gUZ U9O Uvi" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M7 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m5 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-5 10c1.8 0 3.5-.41 5-1.15l3.69.65A2 2 0 0 0 23 20.7l-.65-3.7A11.5 11.5 0 1 0 12 23.5m8.55-7.36-.28.58.76 4.31-4.31-.76-.58.28q-1.89.93-4.14.95a9.5 9.5 0 1 1 8.55-5.36"></path></svg>}
              </a>
              {messages.isOpen ? (<div ref={settings.popupRef} className='fixed top-4 left-22 z-999 w-98 pt-2 pb-4 pl-2 pr-1 rounded-2xl overflow-y-auto h-[95vh] shadow-[0_8px_10px_3px_rgba(0,0,0,0.25)] bg-white'>
                <div className="header flex justify-between pl-2 items-center">
                  <h1 className='font-["SF_Pro_Bold"] text-xl'>Messages</h1>
                  <button className='cursor-pointer hover:bg-[#f1f1f1] p-3 rounded-2xl'><svg aria-hidden="true" aria-label="" className="gUZ U9O Uvi" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M2.5 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5m9.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5m9.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5"></path></svg></button>
                </div>
                <div className="create-new-message flex items-center cursor-pointer hover:bg-[#e5e5de] py-3 gap-2 w-full rounded-2xl px-4">
                  <div className="svg w-12 h-12 rounded-full flex items-center justify-center  bg-[#e60024]"><svg aria-label="Compose new message" fill='white' class="gUZ U9O ePF" height="20" role="img" viewBox="0 0 24 24" width="20"><path d="M23.3458 0.633387C22.4924 -0.211454 21.1083 -0.211454 20.2549 0.633387L18.7363 2.13571L21.8272 5.1931L23.3727 3.66441C24.2268 2.82023 24.1999 1.47756 23.3458 0.633387ZM17.762 3.10349L9.39669 11.3893L8.35883 15.6412L12.4876 14.4467L20.8963 6.23791L17.762 3.10349ZM4.70156 1.01393C2.10496 1.01393 0 3.16788 0 5.82491V19.1887C0 21.8458 2.10496 23.9997 4.70156 23.9997H18.2838C20.8804 23.9997 22.9854 21.8458 22.9854 19.1887V14.074C22.9854 13.1884 22.2838 12.5068 21.4182 12.5068C20.5527 12.5068 19.851 13.1884 19.851 14.074V19.1887C19.851 20.0744 19.1494 20.7924 18.2838 20.7924H4.70156C3.83603 20.7924 3.13437 20.0744 3.13437 19.1887V5.82491C3.13437 4.93923 3.83603 4.22125 4.70156 4.22125H9.92552C10.7911 4.22125 11.4927 3.50326 11.4927 2.61759C11.4927 1.73191 10.7911 1.01393 9.92552 1.01393H4.70156Z"></path></svg></div>
                  <h2 className='font-["SF_Pro_Bold"] text-md'>New message</h2>
                </div>
                <div className="messages px-4 py-4">
                  <h3 className='font-["SF_Pro"]'>Messages</h3>
                </div>
              </div>) : (<></>)}
            </div>
        </div>
        <div ref={settings.triggerRef}>

          <a href="#" className='navlink-item' onClick={settings.toggle}>
            {settings.isOpen ? <svg aria-hidden="true" aria-label="" className="gUZ U9O Uvi" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0M14.7.3c.73.18 1.25.74 1.43 1.41l.58 2.14 2.14-.57a2 2 0 0 1 1.93.54 12 12 0 0 1 2.7 4.67c.21.72-.01 1.46-.5 1.95L21.4 12l1.57 1.57c.49.49.72 1.23.5 1.94a12 12 0 0 1-2.7 4.67c-.51.55-1.27.73-1.94.55l-2.13-.58-.58 2.14a1.9 1.9 0 0 1-1.43 1.4 12 12 0 0 1-5.4 0 2 2 0 0 1-1.43-1.4l-.58-2.14-2.14.58c-.66.18-1.42 0-1.93-.54a12 12 0 0 1-2.7-4.68c-.22-.72.01-1.46.5-1.95L2.6 12l-1.57-1.56a2 2 0 0 1-.5-1.95 12 12 0 0 1 2.7-4.67 2 2 0 0 1 1.93-.54l2.14.57.58-2.14c.17-.66.7-1.23 1.43-1.4a12 12 0 0 1 5.4 0M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10"></path></svg> : <svg aria-hidden="true" aria-label="" className="gUZ U9O Uvi" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10m3 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m1.13-10.29A2 2 0 0 0 14.7.31a12 12 0 0 0-5.4 0c-.73.17-1.26.74-1.43 1.4l-.58 2.14-2.14-.57a2 2 0 0 0-1.93.54 12 12 0 0 0-2.7 4.67c-.22.72.01 1.46.5 1.95L2.59 12l-1.57 1.56a2 2 0 0 0-.5 1.95 12 12 0 0 0 2.7 4.68c.51.54 1.27.72 1.93.54l2.14-.58.58 2.14c.17.67.7 1.24 1.43 1.4a12 12 0 0 0 5.4 0 2 2 0 0 0 1.43-1.4l.58-2.14 2.13.58c.67.18 1.43 0 1.94-.55a12 12 0 0 0 2.7-4.67 2 2 0 0 0-.5-1.94L21.4 12l1.57-1.56c.49-.5.71-1.23.5-1.95a12 12 0 0 0-2.7-4.67 2 2 0 0 0-1.93-.54l-2.14.57zm-6.34.54a10 10 0 0 1 4.42 0l.56 2.12a2 2 0 0 0 2.45 1.41l2.13-.57a10 10 0 0 1 2.2 3.83L20 10.59a2 2 0 0 0 0 2.83l1.55 1.55a10 10 0 0 1-2.2 3.82l-2.13-.57a2 2 0 0 0-2.44 1.42l-.57 2.12a10 10 0 0 1-4.42 0l-.57-2.12a2 2 0 0 0-2.45-1.42l-2.12.57a10 10 0 0 1-2.2-3.82L4 13.42a2 2 0 0 0 0-2.83L2.45 9.03a10 10 0 0 1 2.2-3.82l2.13.57a2 2 0 0 0 2.44-1.41z"></path></svg>}
          </a>
          {settings.isOpen ? (<div ref={settings.popupRef} className='fixed bottom-2 left-21 z-999 w-98 py-4 pl-2 pr-1 rounded-2xl overflow-y-auto h-[60vh] shadow-[0_8px_10px_3px_rgba(0,0,0,0.25)] bg-white'>
                <div className="settings w-full flex flex-col">
                  <h1 className='px-2 py-1 font-["SF_Pro_Bold"] text-xl'>Settings</h1>
                  <div className="settings-links text-md font-['SF_Pro_Medium'] gap-1 py-2 flex flex-col">
                    <NavLink to='/settings' className='py-2 px-3 hover:bg-[#eee] rounded-xl'>Settings</NavLink>
                    <NavLink className='py-2 px-3 hover:bg-[#eee] rounded-xl'>Refine your Recommendations</NavLink>
                    <NavLink className='py-2 px-3 hover:bg-[#eee] rounded-xl'>Link to Pinterest</NavLink>
                    <NavLink className='py-2 px-3 hover:bg-[#eee] rounded-xl'>Reports and Violation center</NavLink>
                    <NavLink className='py-2 px-3 hover:bg-[#eee] rounded-xl'>Install the Windows app</NavLink>
                    <NavLink className='py-2 px-3 hover:bg-[#eee] rounded-xl'>Be a beta tester</NavLink>
                  </div>
                </div>
              </div>) : (<></>)}
        </div>
    </div>
  )
}

export default Sidebar