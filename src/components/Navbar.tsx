import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleBackRoute = () => {
    if (role === "user") navigate("/user");
    else navigate("/librarian");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a7af54b9-3a91-433b-99e7-5274c8355a63/de5mmbu-2471ba83-d537-4754-bd90-acfd4d861b15.png/v1/fill/w_896,h_892/digital_library_new_logo_v2_by_kirstenjadediaz_de5mmbu-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTg5IiwicGF0aCI6IlwvZlwvYTdhZjU0YjktM2E5MS00MzNiLTk5ZTctNTI3NGM4MzU1YTYzXC9kZTVtbWJ1LTI0NzFiYTgzLWQ1MzctNDc1NC1iZDkwLWFjZmQ0ZDg2MWIxNS5wbmciLCJ3aWR0aCI6Ijw9OTkzIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.VQ6wGiQPoOBtvKTcUAwmpXPxi_i0NS5RTUTIxEcJNXs" alt="Library Logo" className="w-10 h-10" />
        <h1 className="text-xl md:text-2xl font-bold text-purple-700">Library System</h1>
      </div>
      <div className="space-x-4">
        {role ? (
          <>
            <Button variant="outline" onClick={handleBackRoute}>Dashboard</Button>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Link to="/" className="text-purple-600 hover:underline">Home</Link>
            <Link to="/login" className="text-purple-600 hover:underline">Login</Link>
            <Link to="/register" className="text-purple-600 hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { Button } from './ui/button'
// import { useAuth } from '../context/AuthContext';


// const Navbar = () => {
//     const navigate =useNavigate();
//     const {logout}=useAuth();

    
//     const role = localStorage.getItem("role");
   
//     const handleLogout =()=>{
//         logout() 
//         navigate("/login")
//         console.log(role)
        
//     }
//     const handleBackRoute=()=>{
//       if(role == "user")
//       {
//         navigate("/user")
//       }
//       else{
//         navigate("/librarian")
//       }

//     }
//   return (
//     <nav className='bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 flex justify-between items-center shadow-lg'>
//         <h1 className='text-2xl font-bold'>Libaray Management System</h1>
//          <div className='space-x-4'>
//             {role ? (              
//               <>
//               <Button className="cursor-pointer align-items-right bg-white text-purple-700 px-3 py-1 rounded hover:bg-gray-100" variant="outline" onClick={handleBackRoute}>Dashboard</Button>
//               <Button className="cursor-pointer align-items-right bg-white text-purple-700 px-3 py-1 rounded hover:bg-gray-100" variant="outline" onClick={handleLogout}>Logout</Button>
//             </>):
//             <>
           
//             <Link to="/" className='hover:underline'>Home</Link>
//             <Link to="/login" className='hover:underline'>Login</Link>
//             <Link to="/register" className='hover:underline'>Register</Link>
           
//             </>}
     
//          </div>
        
        
//     </nav>
//   )
// }

// export default Navbar