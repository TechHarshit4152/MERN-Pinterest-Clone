import React, { useEffect, useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { useLocation } from 'react-router-dom'

const Login_Register = () => {

  const location = useLocation()

  const mode = location.pathname.endsWith("/register") ? "register" : "login";

  return (
    <div>
      {mode==="login" ? (<LoginForm/>) : (<RegisterForm/>)}
    </div>
  )
}

export default Login_Register