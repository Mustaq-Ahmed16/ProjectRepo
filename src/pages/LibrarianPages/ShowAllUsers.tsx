import React, { useEffect, useState } from 'react';
import { authFetch } from '../../Fetch/api';

interface User {
    id: number;
    username: string;
    email: string;
    phone: string;
    address: string;
}

const ShowAllUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        authFetch(`https://localhost:7102/api/userauth`, token, {
            method: "GET",
        })
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    return (
        <div
            className="min-h-screen bg-cover bg-center p-8"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1524578271613-eb4a6b6c2e6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')"
            }}
        >
            <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-8 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">All Registered Users</h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-purple-200 text-purple-800">
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Username</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Phone</th>
                                <th className="p-3 text-left">Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map(user => (
                                    <tr key={user.id} className="border-b hover:bg-purple-50 transition">
                                        <td className="p-2">{user.id}</td>
                                        <td className="p-2">{user.username}</td>
                                        <td className="p-2">{user.email}</td>
                                        <td className="p-2">{user.phone}</td>
                                        <td className="p-2">{user.address}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-4 text-center text-gray-500">
                                        No Users Found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ShowAllUsers;


// import React, { useEffect, useState } from 'react'
// import { authFetch } from '../../Fetch/api';

// interface User {
//     id:number;
//     username:string;
//     email:string;
//     phone:string;
//     address:string
// }
// const ShowAllUsers = () => {
//     const [users,setUsers]=useState<User[]>([]);
//     const token=localStorage.getItem("token");
   
//     useEffect(()=>{
//             authFetch(`https://localhost:7102/api/userauth`, token,{
//                     method: "GET",
//                   }).then(res=>res.json()).then(data=>setUsers(data));
//           },[]);
//   return (
//     <div className='p-6'>
//         <h2 className='text-2xl font-bold mb-4'>All Registered Users</h2>
//         <table className='w-full border'>
//             <thead>
//                 <tr className='bg-gray-100'>
//                     <th className='p-2 border'>ID</th>
//                     <th className='p-2 border'>Username</th>
//                     <th className='p-2 border'>Email</th>
//                     <th className='p-2 border'>Phone</th>
//                     <th className='p-2 border'>Address</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {
//                     users.length >0 ? users.map(user=>(
//                         <tr key={user.id} className='hover:bg-gray-50'>  
//                             <td className='p-2 border text-center'>{user.id}</td>
//                             <td className='p-2 border text-center'>{user.username}</td>
//                             <td className='p-2 border text-center'>{user.email}</td>
//                             <td className='p-2 border text-center'>{user.phone}</td>
//                             <td className='p-2 border text-center'>{user.address}</td>
//                         </tr>
//                     )) : <p>No Users</p>
//                 }
//             </tbody>
//         </table>
//     </div>
//   )
// }

// export default ShowAllUsers