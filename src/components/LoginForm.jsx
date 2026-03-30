import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import API from '../api/axios'
import toast from 'react-hot-toast'
import { UserContext } from '../context/UserContext'


const LoginForm = () => {
    
    const {setUser} = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [loading, setloading] = useState(false)

    const handleSubmit = async (e) => {
      e.preventDefault()
      setError('')
      setloading(true)

      try {
        const res = await API.post("/login", { email, password });

        if (res.data.success) {
          // Save token + user to localStorage
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.user))
          
          setUser(res.data.user)
          toast.success("Logged in")
          navigate("/") // Redirect to homepage
        }
      } catch (err) {
        console.error(err)
        setError(err.response?.data?.message || 'Something went wrong')
      } finally {
        setloading(false)
      }
    }
  return (
    <div className='w-screen h-screen bg-amber-300 flex items-center justify-center'>
        <div className="login-form w-124 rounded-4xl py-8 items-center h-auto bg-white flex flex-col">
            <svg height='40' role='img' viewBox='-3 -3 82 82' width='40'><path d="M27.5 71c3.3 1 6.7 1.6 10.3 1.6C57 72.6 72.6 57 72.6 37.8 72.6 18.6 57 3 37.8 3 18.6 3 3 18.6 3 37.8c0 14.8 9.3 27.5 22.4 32.5-.3-2.7-.6-7.2 0-10.3l4-17.2s-1-2-1-5.2c0-4.8 3-8.4 6.4-8.4 3 0 4.4 2.2 4.4 5 0 3-2 7.3-3 11.4C35.6 49 38 52 41.5 52c6.2 0 11-6.6 11-16 0-8.3-6-14-14.6-14-9.8 0-15.6 7.3-15.6 15 0 3 1 6 2.6 8 .3.2.3.5.2 1l-1 3.8c0 .6-.4.8-1 .4-4.4-2-7-8.3-7-13.4 0-11 7.8-21 22.8-21 12 0 21.3 8.6 21.3 20 0 12-7.4 21.6-18 21.6-3.4 0-6.7-1.8-7.8-4L32 61.7c-.8 3-3 7-4.5 9.4z" fill="#f84f4f" fill-rule="evenodd"></path></svg>
            <h1 className='text-center font-["SF_Pro_Heavy"] text-3xl text-[#353435]'>Welcome to <br />Pinterest</h1>
            <form onSubmit={handleSubmit} className='flex w-full flex-col items-center px-27 gap-2 pt-8'>
                <div className="email flex w-full flex-col gap-1">
                    <label htmlFor="email" className='font-["SF_Pro"] px-3 text-sm'>Email</label>
                    <input value={email} onChange={(e)=> {setEmail(e.target.value)}} className='py-3 px-4 outline-0 border rounded-2xl font-["SF_Pro_Medium"] border-[#91908f]' type="email" name='email' id='email' placeholder='Email' />
                </div>
                <div className="password flex w-full flex-col gap-1">
                    <label htmlFor="password" className='font-["SF_Pro"] px-3 text-sm'>Password</label>
                    <input value={password} onChange={(e=> {setPassword(e.target.value)})}  className='py-3 px-4  outline-0 border rounded-2xl font-["SF_Pro_Medium"] border-[#91908f]' type="password" name='password' id='password' placeholder='Password' />
                </div>
                {error && <p className='text-red-500 text-sm py-2'>{error}</p>}
                <button type='submit' disabled={loading} className='w-full py-2 flex bg-[#e60024] cursor-pointer text-white font-["SF_Pro"] rounded-xl mt-3 justify-center'>{loading ? 'Logging in...' : 'Log in'}</button>

                <NavLink to='/register' className='font-[SF_Pro_Bold] text-xs cursor-pointer text-[#333]'>Not on Pinterest yet? Sign up</NavLink>
            </form>
        </div>
    </div>
  )
}

export default LoginForm