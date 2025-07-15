import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button';

const Landing = () => {
    const navigate = useNavigate();
  return (
    <div>
        <section className='bg-gradient-to-br from-purple-100 ro-blue-200 min-h-[80vh] flex flex-col items-center justify-center text-center px-4'>
            <h1 className='text-4xl md:text-6xl font-bold mb-6 text-gray-800 animate-pulse'>Welcome to the Online Library</h1>
            <p className='mb-8 text-lg text-gray-600'>Borrow Books,explore Collections, and manage your library account seamlessly.</p>
            <div className='flex gap-4'>
                <Button onClick={()=>navigate("/login")}>Login</Button>
                <Button variant="outline" onClick={()=>navigate("/register")}>Register</Button>
            </div>
        </section>

    </div>
  )
}

export default Landing