import React, { useEffect } from 'react'
import {useData} from '../API/ApiContext'
import {useNavigate} from 'react-router-dom'
const Dashboard = () => {
  const {LogoutAPI} = useData()
  const navigate = useNavigate()

  const Logout = async () => {
    const res = await LogoutAPI();
    if (res.success) {
        alert('User logged out successfully');
        navigate('/')
    } else {
        alert('Logout failed: ' + res.error || res.message);
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
    </>
  )
}

export default Dashboard