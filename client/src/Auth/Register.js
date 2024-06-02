import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {ToastContainer , toast} from 'react-toastify'
import {useData} from '../API/ApiContext'
const ResgisterValue = {
  name:'',
  email:'',
  password:'',
  passwordConfirm:'',
  lastname:'',
  location:'',
}
const Register = () => {
  const Navigate = useNavigate()
  const [register, setRegister] = useState(ResgisterValue);
  const {RegisterApi} = useData()
  const RegisterInputValue = (e)=>{
    setRegister({...register , [e.target.name]: e.target.value})
  }

  const SubmitRegister = async(e)=>{
    e.preventDefault()
    const result = await RegisterApi(register);
    if (result.success) {
        alert('User registered successfully');
        setTimeout(()=>{
          Navigate('/login')
        },2000)
    } else {
        alert('Signup failed: ' + result.error);
    }
  }
  return (
    <>
<div className="bg-gray-200 dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center">
  <div className="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl rounded-xl">
    <div className="bg-gray-800 shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
        <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
      </svg>
    </div>
    <form className="p-12 md:p-24" method='post'>
      <div className="flex items-center text-lg mb-6 md:mb-8">
        <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
          <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
        </svg>
        <input type="text" name='name' onChange={(e)=> RegisterInputValue(e)} id="name" className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Username" required />
      </div>
      <div className="flex items-center text-lg mb-6 md:mb-8">
        <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
          <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
        </svg>
        <input type="text" name='lastname' id="lastname" onChange={(e)=> RegisterInputValue(e)} className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Last Name" required />
      </div>
      <div className="flex items-center text-lg mb-6 md:mb-8">
      <svg className="absolute ml-3" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12.713l11.985-8.713c-.144-.138-4.136-4-11.985-4-7.847 0-11.843 3.866-11.985 4l11.985 8.713z"/>
        <path d="M12 14.939l-12-8.713v14h24v-14l-12 8.713z"/>
      </svg>
        <input type="email" name='email' id="email" onChange={(e)=> RegisterInputValue(e)} className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Email"  required/>
      </div>
      <div className="flex items-center text-lg mb-6 md:mb-8">
      <svg className="absolute ml-3" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
       <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5c-1.378 0-2.5-1.122-2.5-2.5s1.122-2.5 2.5-2.5 2.5 1.122 2.5 2.5-1.122 2.5-2.5 2.5z"/>
      </svg>
        <input type="text" name='location' id="location" onChange={(e)=> RegisterInputValue(e)} className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Location" required/>
      </div>
      <div className="flex items-center text-lg mb-6 md:mb-8">
        <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
          <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
        </svg>
        <input type="password" name='password' id="password" onChange={(e)=> RegisterInputValue(e)} className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Password" />
      </div>
      <div className="flex items-center text-lg mb-6 md:mb-8">
        <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
          <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
        </svg>
        <input type="password" name='passwordConfirm' id="passwordConfirm" onChange={(e)=> RegisterInputValue(e)} className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Coform Password" />
      </div>
      <button onClick={SubmitRegister} className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded">Register</button>
						<div className="text-center mt-4">
                   <hr className="mb-6 border-t" />
						</div>
						<div className="text-center">
            <p className="text-center inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800">Already have an account?
                    <Link to="/login"
                        className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">Login!
                    </Link>
            </p>
						</div>
    </form>
  </div>
 </div>
    </>
  )
}

export default Register
