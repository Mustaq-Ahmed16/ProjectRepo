import React, { useEffect, useState } from 'react'
import { authFetch } from '../../Fetch/api';


interface BorrowedBook {
    id : number;
    bookId:number;
    userId:number;
    book:{
    
        title:string;
        isbn:string;
        publishers:string;
        stock:number;
    };
    
    borrowDate : string;
    returnDate:string;
    fine:number;
}
const ShowAllBorrowedBooks = () => {
  const [borrowedBooks,setBorrowedBooks]=useState<BorrowedBook[]>([]);

  const token = localStorage.getItem("token");

      useEffect(()=>{
        //   fetch(`https://localhost:7102/api/borrows`).then(res=>res.json()).then(data=>setBorrowedBooks(data));
        authFetch(`https://localhost:7102/api/borrows`, token,{
                method: "GET",
              }).then(res=>res.json()).then(data=>setBorrowedBooks(data));
      },[]);
    return (
      <div className='p-6'>
          <h2 className='text-2xl font-bold mb-4'>All Borrowed Books</h2>
          <table className='w-full border'>
              <thead>
                  <tr className='bg-gray-100'>
                      <th className='p-2 border'>Borrow ID</th>
                      <th className='p-2 border'>Book ID</th>
                      <th className='p-2 border'>User ID</th>
                      <th className='p-2 border'>Book Title</th>
                      <th className='p-2 border'>Book ISBN</th>
                      <th className='p-2 border'>Publishers</th>
                      <th className='p-2 border'>Current Stock</th>
                      <th className='p-2 border'>Borrowed Date</th>
                      <th className='p-2 border'>Return Date</th>
                      <th className='p-2 border'>Fine Amount</th>
                  </tr>
              </thead>
              <tbody>
                  {
                      borrowedBooks.map(borrowedBook=>(
                          <tr key={borrowedBook.id} className='hover:bg-gray-50'>  
                              <td className='p-2 border text-center'>{borrowedBook.id}</td>
                              <td className='p-2 border text-center'>{borrowedBook.bookId}</td>
                              <td className='p-2 border text-center'>{borrowedBook.userId}</td>
                              <td className='p-2 border text-center'>{borrowedBook.book.title}</td>
                              <td className='p-2 border text-center'>{borrowedBook.book.isbn}</td>
                              <td className='p-2 border text-center'>{borrowedBook.book.publishers}</td>
                              <td className='p-2 border text-center'>{borrowedBook.book.stock}</td>
                              <td className='p-2 border text-center'>{borrowedBook.borrowDate}</td>
                              <td className='p-2 border text-center'>{borrowedBook.returnDate}</td>
                              <td className='p-2 border text-center'>{borrowedBook.fine}</td>
                          </tr>
                      ))
                  }
              </tbody>
          </table>
      </div>
    )
}

export default ShowAllBorrowedBooks