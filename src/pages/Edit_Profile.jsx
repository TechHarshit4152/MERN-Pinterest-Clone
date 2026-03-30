import React, { useContext, useRef, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { FaCircleUser } from "react-icons/fa6";
import API from '../api/axios';
import toast from 'react-hot-toast';

const Edit_Profile = () => {
    const {user, setUser} = useContext(UserContext)

    const [name, setname] = useState(user.name)
    const [bio, setbio] = useState(user.bio)
    const [username, setusername] = useState(user.username)
    const [file, setfile] = useState(null)
    const [loading, setloading] = useState(false)

    const sameUser = name.trim() === user.name.trim() && bio.trim() === (user.bio || "").trim() && username.trim() === user.username.trim() && file === null;
    
    
    

    const fileInputRef = useRef(null)
    const previewRef = useRef(null)
    const imgRef = useRef(null)

    const hasProfileImage = !!(user?.profileImage && user.profileImage.trim().length > 0);

    const handleClick = (e)=> {
        e.preventDefault()
        fileInputRef.current.click()
    }

    const handleFile = (file)=> {
        if (!file.type.startsWith("image/")) {
            alert("Please select an image file (jpg, png, etc.)");
            return;
        }

        if (file.size > 2 * 1024 * 1024) { // > 2MB
            alert("Image size should be less than 2MB");
            return;
        }
        setfile(file)

        const reader = new FileReader()
        reader.onload = (e)=> {
            imgRef.current.src = e.target.result
        }
        if (imgRef.current) imgRef.current.src = "";
        reader.readAsDataURL(file)

    }


    const handleInputChange = (e)=> {
 
        const file = fileInputRef.current.files?.[0]
        if(file) handleFile(file)
    }

    const handleSubmit = async (e)=> {
        e.preventDefault()
        setloading(true)

        try {
            const formdata = new FormData();
            formdata.append("username", username)
            formdata.append("bio", bio)
            formdata.append("name", name)
            if(file) formdata.append("image", file)

            const {data} = await API.post("/editprofile", formdata , {
                headers: { "Content-Type": "multipart/form-data"}
            })

            if(data.success) {
                localStorage.setItem('user', JSON.stringify(data.user))
                setUser(data.user)

                setname(data.user.name)
                setbio(data.user.bio)
                setusername(data.user.username)
                setfile(null)
                toast.success("Profile Updated")
            }
        } catch(err) {
            console.log(err);
            toast.error(err.message)
            
        } finally {
            setloading(false)
        }
    }
  return (
    <div className='w-full h-full overflow-x-hidden py-9 px-2 '>
        <h1 className='text-[1.7rem] font-["SF_Pro_Bold"]'>Edit profile</h1>
        <p className='w-120 font-["SF_Pro"] leading-tight mt-1 text-[#1f1e1e]'>Keep your personal details private. Information you add here is visible to anyone who can view your profile.</p>
        <form onSubmit={handleSubmit} className='flex mt-14 flex-col w-fit h-auto pb-40'>
            <div className="profile-img flex items-center w-full gap-4">
                <div className="preview w-19 h-19 rounded-full overflow-hidden flex items-center justify-center" ref={previewRef}>
                    {hasProfileImage || file  ? <img src={file ? imgRef.current?.src : `http://localhost:8080/uploads/${user.profileImage}`} className='w-full object-cover h-full bg-cover' ref={imgRef} alt="Profile preview" /> : <FaCircleUser fill='#dbdbdb' className='w-full bg-white h-full'/>}
                </div>
                <input type="file" onChange={handleInputChange} className='hidden' ref={fileInputRef}/>
                <button type='button' onClick={handleClick} className='py-2 px-3 cursor-pointer text-sm bg-[#e4e5e0] font-["SF_Pro_Medium"] rounded-xl'>Change</button>
            </div>
            <div className="Name flex flex-col mt-4 py-4 w-122 gap-3 font-['SF_Pro'] px-4 rounded-2xl border border-[#91918d]">
                <label htmlFor="name" className='text-xs'>Name</label>
                <input type="text" name="" id="name" value={name} className='outline-0 border-0' onChange={(e)=> {setname(e.target.value)}}/>
            </div>
            <div className="Bio flex flex-col mt-4 py-4 w-122 gap-3 font-['SF_Pro'] px-4 rounded-2xl border border-[#91918d]">
                <label htmlFor="name" className='text-xs'>About</label>
                <input type="text" name="" id="name" value={bio} placeholder='Tell your story' className='outline-0 border-0' onChange={(e)=> {setbio(e.target.value)}}/>
            </div>
            <div className="Username flex flex-col mt-4 py-4 w-122 gap-3 font-['SF_Pro'] px-4 rounded-2xl border border-[#91918d]">
                <label htmlFor="name" className='text-xs'>Username</label>
                <input type="text" name="" id="name" value={username} placeholder='Tell your story' className='outline-0 border-0' onChange={(e)=> {setusername(e.target.value)}}/>
            </div>
                <p className='text-xs font-["SF_Pro"] ml-3 mt-3 text-[#494949]'>localhost:5173/{user.username}</p>
            <div className='fixed bottom-0 left-0 bg-white flex  justify-center shadow-[0px_1px_16px_4px_rgba(0,0,0,0.25)] w-full h-20 '>
                {sameUser ? (<button disabled className='bg-[#c7c9c3] mb-3 cursor-not-allowed text-white font-["SF_Pro_Bold"] py-3 px-6 rounded-2xl mt-5 ml-5'>Save</button>) : (<button type='submit' disabled={loading} className='bg-[#e60024] mb-3  cursor-pointer text-white font-["SF_Pro_Bold"] py-3 px-6 rounded-2xl mt-5 ml-5'>{loading ? 'Saving...' : "Save"}</button>)}
            </div>
        </form>
    </div>
  )
}

export default Edit_Profile