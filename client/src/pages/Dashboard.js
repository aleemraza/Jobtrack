import React, { useEffect } from 'react'
import {useData} from '../API/ApiContext'
import {useNavigate} from 'react-router-dom'
import {ToastContainer , toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Dashboard = () => {
  const {LogoutAPI} = useData()
  const navigate = useNavigate()

  const Logout = async () => {
    const res = await LogoutAPI();
    if (res.success) {
      toast.success("User logged out successfully",{
        position:"top-center"
      });
      setTimeout(()=>{
        navigate('/')
      },2000)
    } else {
      toast.error("Logout failed",{
        position:"top-center"
      })
        console.log('Logout failed: ' + res.error || res.message);
    }
};
  return (
    <>
    <h1>DashBoard</h1>
    <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={Logout}
            >
                Logout
            </button>
    <ToastContainer/>        
    </>
  )
}

export default Dashboard
