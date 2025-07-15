import React, { useEffect, useState } from 'react';
import { authFetch } from '../../Fetch/api';

interface BorrowedBook {
    id: number;
    bookId: number;
    userId: number;
    book: {
        title: string;
        isbn: string;
        publishers: string;
        stock: number;
    };
    borrowDate: string;
    returnDate: string;
    fine: number;
}

const ITEMS_PER_PAGE = 6;

const ShowAllBorrowedBooks = () => {
    const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const token = localStorage.getItem("token");

    useEffect(() => {
        authFetch(`https://localhost:7102/api/borrows`, token, {
            method: "GET",
        }).then(res => res.json())
            .then(data => setBorrowedBooks(data));
    }, []);

    const paginatedBooks = borrowedBooks.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const totalPages = Math.ceil(borrowedBooks.length / ITEMS_PER_PAGE);

    return (
        <div
            className="min-h-screen bg-cover bg-center p-8"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1529148482759-b35b25c174b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')"
            }}
        >
            <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-8 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">All Borrowed Books</h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-blue-200 text-blue-800">
                                <th className="p-3 text-left">Borrow ID</th>
                                <th className="p-3 text-left">Book ID</th>
                                <th className="p-3 text-left">User ID</th>
                                <th className="p-3 text-left">Title</th>
                                <th className="p-3 text-left">ISBN</th>
                                <th className="p-3 text-left">Publishers</th>
                                <th className="p-3 text-center">Stock</th>
                                <th className="p-3 text-center">Borrow Date</th>
                                <th className="p-3 text-center">Return Date</th>
                                <th className="p-3 text-center">Fine</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedBooks.map(borrowedBook => (
                                <tr key={borrowedBook.id} className="border-b hover:bg-blue-50 transition">
                                    <td className="p-2">{borrowedBook.id}</td>
                                    <td className="p-2">{borrowedBook.bookId}</td>
                                    <td className="p-2">{borrowedBook.userId}</td>
                                    <td className="p-2">{borrowedBook.book.title}</td>
                                    <td className="p-2">{borrowedBook.book.isbn}</td>
                                    <td className="p-2">{borrowedBook.book.publishers}</td>
                                    <td className="p-2 text-center">{borrowedBook.book.stock}</td>
                                    <td className="p-2 text-center">{borrowedBook.borrowDate}</td>
                                    <td className="p-2 text-center">{borrowedBook.returnDate}</td>
                                    <td className="p-2 text-center">{borrowedBook.fine}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-6 gap-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-4 py-2 rounded-full ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShowAllBorrowedBooks;


// import React, { useEffect, useState } from 'react'
// import { authFetch } from '../../Fetch/api';


// interface BorrowedBook {
//     id : number;
//     bookId:number;
//     userId:number;
//     book:{
    
//         title:string;
//         isbn:string;
//         publishers:string;
//         stock:number;
//     };
    
//     borrowDate : string;
//     returnDate:string;
//     fine:number;
// }
// const ShowAllBorrowedBooks = () => {
//   const [borrowedBooks,setBorrowedBooks]=useState<BorrowedBook[]>([]);

//   const token = localStorage.getItem("token");

//       useEffect(()=>{
//         //   fetch(`https://localhost:7102/api/borrows`).then(res=>res.json()).then(data=>setBorrowedBooks(data));
//         authFetch(`https://localhost:7102/api/borrows`, token,{
//                 method: "GET",
//               }).then(res=>res.json()).then(data=>setBorrowedBooks(data));
//       },[]);
//     return (
//       <div className='p-6'>
//           <h2 className='text-2xl font-bold mb-4'>All Borrowed Books</h2>
//           <table className='w-full border'>
//               <thead>
//                   <tr className='bg-gray-100'>
//                       <th className='p-2 border'>Borrow ID</th>
//                       <th className='p-2 border'>Book ID</th>
//                       <th className='p-2 border'>User ID</th>
//                       <th className='p-2 border'>Book Title</th>
//                       <th className='p-2 border'>Book ISBN</th>
//                       <th className='p-2 border'>Publishers</th>
//                       <th className='p-2 border'>Current Stock</th>
//                       <th className='p-2 border'>Borrowed Date</th>
//                       <th className='p-2 border'>Return Date</th>
//                       <th className='p-2 border'>Fine Amount</th>
//                   </tr>
//               </thead>
//               <tbody>
//                   {
//                       borrowedBooks.map(borrowedBook=>(
//                           <tr key={borrowedBook.id} className='hover:bg-gray-50'>  
//                               <td className='p-2 border text-center'>{borrowedBook.id}</td>
//                               <td className='p-2 border text-center'>{borrowedBook.bookId}</td>
//                               <td className='p-2 border text-center'>{borrowedBook.userId}</td>
//                               <td className='p-2 border text-center'>{borrowedBook.book.title}</td>
//                               <td className='p-2 border text-center'>{borrowedBook.book.isbn}</td>
//                               <td className='p-2 border text-center'>{borrowedBook.book.publishers}</td>
//                               <td className='p-2 border text-center'>{borrowedBook.book.stock}</td>
//                               <td className='p-2 border text-center'>{borrowedBook.borrowDate}</td>
//                               <td className='p-2 border text-center'>{borrowedBook.returnDate}</td>
//                               <td className='p-2 border text-center'>{borrowedBook.fine}</td>
//                           </tr>
//                       ))
//                   }
//               </tbody>
//           </table>
//       </div>
//     )
// }

// export default ShowAllBorrowedBooks