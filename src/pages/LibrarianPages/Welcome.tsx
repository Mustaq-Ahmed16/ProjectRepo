import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


interface WelcomeProps {
    role : "librarian" | "user";
}
const Welcome:React.FC<WelcomeProps>=({role})=> {
    const navigate=useNavigate();
    useEffect(()=>{
        if(role == "librarian")
        {
            navigate("/librarian");
        }
        else{
            navigate("/user");
        }
    },[role,navigate]);
  return (
    <div className='bg-gradient-to-br from-purple-100 ro-blue-200 min-h-[80vh] flex flex-col items-center justify-center text-center px-4'>
        <h1 className='text-4xl md:text-6xl font-bold mb-6 text-gray-800 animate-pulse'>Redirecting to your Dashboard...</h1>
    </div>
  )
}


export default Welcome