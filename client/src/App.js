import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProtectedRoute from './API/ProtectedRoute'
import Login from './Auth/Login';
import Register from './Auth/Register';
import AdminHome from './pages/adminpages/AdminHome'
import Addjob from './pages/adminpages/Addjob'
function App() {

  return (
   <>
    <BrowserRouter>
    <Routes>
    <Route  path='/' element={<Home/>}/>
    <Route  path='/register' element={<Register/>}/>
    <Route  path='/login' element={<Login/>}/>
    <Route  path='/adminhome' element={<ProtectedRoute><AdminHome/></ProtectedRoute>}/>
    <Route  path='/addjob' element={<ProtectedRoute><Addjob/></ProtectedRoute>}/>
   
    </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
