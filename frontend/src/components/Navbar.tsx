
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const navigate =useNavigate();
    const {logout}=useAuth();

    
    const role = localStorage.getItem("role");
   
    const handleLogout =()=>{
        logout() 
        navigate("/login")
        console.log(role)
        
    }
    const handleBackRoute=()=>{
      if(role == "user")
      {
        navigate("/user")
      }
      else{
        navigate("/librarian")
      }

    }
  return (
    <nav className='bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 flex justify-between items-center shadow-lg'>
        <h1 className='text-2xl font-bold'>Libaray Management System</h1>
         <div className='space-x-4'>
            {role ? (              
              <>
              <Button className="cursor-pointer align-items-right bg-white text-purple-700 px-3 py-1 rounded hover:bg-gray-100" variant="outline" onClick={handleBackRoute}>Dashboard</Button>
              <Button className="cursor-pointer align-items-right bg-white text-purple-700 px-3 py-1 rounded hover:bg-gray-100" variant="outline" onClick={handleLogout}>Logout</Button>
            </>):
            <>
           
            <Link to="/" className='hover:underline'>Home</Link>
            <Link to="/login" className='hover:underline'>Login</Link>
            <Link to="/register" className='hover:underline'>Register</Link>
           
            </>}
     
         </div>
        
        
    </nav>
  )
}

export default Navbar