import React, { useContext, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import API from '../api/axios'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

export const Createpost = () => {

  const [title, settitle] = useState('')
  const navigate = useNavigate()
  const {user, setUser} = useContext(UserContext)
  const [description, setdescription] = useState('')
  const [loading, setloading] = useState(false)
  const [file, setfile] = useState(null)
  const fileInputRef = useRef(null)
  const previewInfoRef = useRef(null)
  const previewBoxRef = useRef(null)
  const imgRef = useRef(null)
  const deleteRef = useRef(null)
  const [isDisabled, setisDisabled] = useState(true)
  const [IsDragging, setIsDragging] = useState(false)

  const handleClick = ()=> {
    fileInputRef.current.click()
  }

  const handleFile = (file) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (jpg, png, etc.)");
      return;
    }

    setfile(file)
    const reader = new FileReader();
    reader.onload = (e) => {
      previewInfoRef.current.style.display = "none";
      setisDisabled(false)
      imgRef.current.src = e.target.result;
      imgRef.current.classList.remove("hidden");
      deleteRef.current.classList.remove("hidden")

      // cleanup styles
      previewBoxRef.current.classList.remove("border-dashed");
      previewBoxRef.current.classList.remove("bg-[#e5e5de]");
      previewBoxRef.current.classList.remove("h-115")
      previewBoxRef.current.classList.add("h-auto")
      fileInputRef.current.disabled = true
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = ()=> {
    const file = fileInputRef.current.files?.[0]
    if(file) handleFile(file)
  }

  const handleDragOver = (e)=> {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e)=> {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e)=> {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if(file) handleFile(file)
    }
  
  const removeImage = (e)=> {
    e.stopPropagation()
    fileInputRef.current.value = ""
    imgRef.current.src = ""
    deleteRef.current.classList.add("hidden")
    previewBoxRef.current.classList.add("border-dashed")
    previewBoxRef.current.classList.add("border-2")
    previewBoxRef.current.classList.add("bg-[#e5e5de]");
    previewBoxRef.current.classList.remove("h-auto")
    previewBoxRef.current.classList.add("h-115")
    previewInfoRef.current.style.display = "block"
    fileInputRef.current.disabled = false
    setisDisabled(true)
  }


  const handleSubmit = async (e)=> {
    e.preventDefault()
    if(!file) return toast.error("Please upload an image")
    setloading(true)
    const userId = user._id

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", file); // 🔥 critical part
    
    try {
      const res = await API.post('/createpin', formData, {headers: {"Content-Type": "multipart/form-data"}})

      if(res.data.success) {
        setUser(res.data.user)
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(res.data.user))
        toast.success("Pin created")
        navigate(`/${res.data.user.username}/_profile/_created`)
      }
    } catch(err) {
      console.log(err);
      toast.error("Error creating pin")
    } finally {
      setloading(false)
    }
  }
  return (
    <div className='pt-20 overflow-y-auto'>
      <form onSubmit={handleSubmit}>
        <div className="info w-full py-5.5 px-4 font-['SF_Pro_Bold'] flex justify-between pr-12 border-b border-[#e9e7e9]">
          <h1 className=' text-xl'>Create Pin</h1>
          {!isDisabled && <button type='submit' className='font-["SF_Pro_Medium"] text-lg text-white bg-[#e60024] py-2 px-4 cursor-pointer hover:bg-[#d60020] rounded-2xl'>Publish</button>}
        </div>

        <div className="uploads-info w-full  flex ">
          <div className="image w-[40%] pl-[87px] pt-8">
            <div onClick={handleClick} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} ref={previewBoxRef} className={`preview relative overflow-hidden w-94 h-115 cursor-pointer  rounded-4xl border-2 border-[#dadad8] border-dashed ${
                IsDragging ? "bg-[#d2d2cc]" : "bg-[#e5e5de]"
              }`}>
              <button ref={deleteRef} onClick={removeImage}  className='hidden bg-[#f4f4f5] rounded-xl p-3 absolute cursor-pointer  top-6 right-6'><svg aria-hidden="true" aria-label="" className="gUZ U9O Uvi" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M15.3 1.3a4 4 0 0 1 5.53.11l1.76 1.76a4 4 0 0 1 .11 5.53L9.95 21.48a2 2 0 0 1-1.12.57L2.41 23a1 1 0 0 1-.86-.28l-.25-.25a1 1 0 0 1-.28-.86l.95-6.42a2 2 0 0 1 .57-1.12L15.17 1.4l.02-.02zM3.93 15.46l-.57 4.03a1 1 0 0 0 1.13 1.13l4.03-.57L18.58 10 14 5.4zM18.57 2.32a2 2 0 0 0-1.98.5l-.47.47a1 1 0 0 0 0 1.42l3.17 3.17a1 1 0 0 0 1.4.01l.48-.48a2 2 0 0 0 0-2.82l-1.76-1.76a2 2 0 0 0-.84-.5"></path></svg></button>
              <img src="" ref={imgRef} className='hidden w-full bg-cover'  alt="" />
              <div ref={previewInfoRef} className="preview-info w-full h-full">

                <div className="choose-file w-full pt-45 gap-4 flex items-center flex-col">
                  <svg aria-label="Add files" className="gUZ U9O bW6" height="32" role="img" viewBox="0 0 24 24" width="32"><path d="M15.3 12.7 13 10.42V17h-2v-6.59l-2.3 2.3-1.4-1.42L12 6.6l4.7 4.7zM24 12a12 12 0 1 1-24 0 12 12 0 0 1 24 0M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20"></path></svg>
                  <h3  className='text-center font-["SF_Pro"] leading-[1.4rem] '>Choose a file or drag and <br /> drop it here</h3>
                </div>
                <p className='py-27 text-sm font-["SF_Pro"] text-center'>We recommend using high quality .jpg files less <br /> than 20 MB or .mp4 files less than 200 MB.</p>
              </div>
            </div>
            <input type="file" onChange={handleInputChange} ref={fileInputRef}  className='bg-amber-200 hidden image-file' />
          </div>
          <div className="image-dets w-[60%] flex flex-col pr-30 gap-6 pt-8">
            {isDisabled ? (
              
              <div aria-disabled={true}>
                <div className="title flex flex-col gap-2">
                  <label htmlFor='title' className='font-["SF_Pro"] text-xs'>Title</label>
                  <input disabled  type="text" className='px-4 pt-3 w-full border-[#c7c9c3] bg-[#e5e5de]  border rounded-2xl pb-10 font-["SF_Pro"]' name="title" id="title" placeholder='Add a title' />
                </div>
                <div className="desc flex flex-col gap-2">
                  <label htmlFor='desc' className='font-["SF_Pro"] text-xs'>Description</label>
                  <input disabled  type="text" className='px-4 pt-3 w-full border-[#c7c9c3] bg-[#e5e5de] border rounded-2xl pb-16 font-["SF_Pro"]' name="title" id="desc" placeholder='Add a detailed description' />
                </div>
              </div>
            ) : (
              <div>
                <div className="title flex flex-col gap-2">
                  <label htmlFor='title' className='font-["SF_Pro"] text-xs'>Title</label>
                  <input value={title} onChange={(e)=> {settitle(e.target.value)}} type="text" className='px-4 pt-3 w-full border-[#73756e] border rounded-2xl pb-10 font-["SF_Pro"]' name="title" id="title" placeholder='Add a title' />
                </div>
                <div className="desc flex flex-col gap-2">
                  <label htmlFor='desc' className='font-["SF_Pro"] text-xs'>Description</label>
                  <input value={description} onChange={(e)=> {setdescription(e.target.value)}} type="text" className='px-4 pt-3 w-full border-[#73756e] border rounded-2xl pb-16 font-["SF_Pro"]' name="title" id="desc" placeholder='Add a detailed description' />
                </div>
              </div>

            )}
          </div>
        </div>
      </form>
    </div>
  )
}
