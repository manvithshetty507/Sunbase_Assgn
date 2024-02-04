import React, { useState } from 'react'
import SignUp from '../features/SignUp/SignUp'
import Login from '../features/SignUp/Login'
import '../App.css'


function SignUpLogin() {
    const [toggle,setToggle] = useState(false)

    const toggleHandle = () => {
        setToggle((prev) => !prev)
    }
  return (
    <>
        {(toggle) ? <Login /> : <SignUp />}
        <p onClick={toggleHandle} className="toggler">{(toggle) ? <span>New User Sign Up!</span> : <span>Already have an account Login?</span>}</p>

    </>
  )
}

export default SignUpLogin