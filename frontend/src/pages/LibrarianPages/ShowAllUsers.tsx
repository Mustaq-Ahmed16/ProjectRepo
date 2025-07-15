import React, { useEffect, useState } from 'react'
import { authFetch } from '../../Fetch/api';

interface User {
    id:number;
    username:string;
    email:string;
    phone:string;
    address:string
}
const ShowAllUsers = () => {
    const [users,setUsers]=useState<User[]>([]);
    const token=localStorage.getItem("token");
   
    useEffect(()=>{
            authFetch(`https://localhost:7102/api/userauth`, token,{
                    method: "GET",
                  }).then(res=>res.json()).then(data=>setUsers(data));
          },[]);
  return (
    <div className='p-6'>
        <h2 className='text-2xl font-bold mb-4'>All Registered Users</h2>
        <table className='w-full border'>
            <thead>
                <tr className='bg-gray-100'>
                    <th className='p-2 border'>ID</th>
                    <th className='p-2 border'>Username</th>
                    <th className='p-2 border'>Email</th>
                    <th className='p-2 border'>Phone</th>
                    <th className='p-2 border'>Address</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.length >0 ? users.map(user=>(
                        <tr key={user.id} className='hover:bg-gray-50'>  
                            <td className='p-2 border text-center'>{user.id}</td>
                            <td className='p-2 border text-center'>{user.username}</td>
                            <td className='p-2 border text-center'>{user.email}</td>
                            <td className='p-2 border text-center'>{user.phone}</td>
                            <td className='p-2 border text-center'>{user.address}</td>
                        </tr>
                    )) : <p>No Users</p>
                }
            </tbody>
        </table>
    </div>
  )
}

export default ShowAllUsers