import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button';

const LibrarianDashboard = () => {
    const navigate = useNavigate();

  return (
    <div className='p-8 bg-gradient-to-br from-blue-50 to-white min-h-screen'>
        <h1 className='text-3xl font-bild mb-6'>Librarian Dashboard</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Button onClick={()=>navigate("/librarian/books")}>Manage Books</Button>
            <Button onClick={()=>navigate("/librarian/authors ")}>Manage Authors</Button>
            <Button onClick={()=>navigate("/librarian/borrow")}>Insert Borrow Record</Button>
            <Button onClick={()=>navigate("/librarian/return")}>Update Return Record</Button>
            <Button onClick={()=>navigate("/librarian/users")}>Show Users</Button>
            <Button onClick={()=>navigate("/librarian/borrowed")}>Show Borrowed Book Users</Button>
            <Button onClick={()=>navigate("/librarian/search")}>Search</Button>
        </div>
    </div>
  )
}

export default LibrarianDashboard