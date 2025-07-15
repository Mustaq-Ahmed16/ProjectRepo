// src/pages/MyBorrowedBooks.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface BorrowedBook {
  id: number;
  bookTitle: string;
  borrowDate: string;
  returnDate: string | null;
}

const MyBorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      fetch(`https://localhost:7102/api/borrows/user/${user.id}`)
        .then(res => res.json())
        .then(data => setBorrowedBooks(data));
    }
  }, [user?.id]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Borrowed Books</h2>
      <div className="space-y-2">
        {borrowedBooks.length === 0 && <p>No borrowed books found.</p>}
        {borrowedBooks.map(book => (
          <div key={book.id} className="p-4 bg-gray-100 rounded shadow">
            <h3 className="font-bold">{book.bookTitle}</h3>
            <p className="text-sm">Borrow Date: {book.borrowDate}</p>
            <p className={`text-sm ${book.returnDate ? "text-green-600" : "text-red-600"}`}>
              {book.returnDate ? `Returned: ${book.returnDate}` : "Not Returned Yet"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBorrowedBooks;


// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { FaBook, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// interface BorrowedBook {
//   id: number;
//   bookTitle: string;
//   borrowDate: string;
//   returnDate: string | null;
// }

// const MyBorrowedBooks = () => {
//   const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
//   const { user } = useAuth();

//   useEffect(() => {
//     if (!user?.id) return;

//     fetch(`https://localhost:7102/api/borrows/user/${user.id}`)
//       .then((res) => res.json())
//       .then((data) => setBorrowedBooks(data));
//   }, [user?.id]);

//   const formatDate = (date: string | null) =>
//     date ? new Date(date).toLocaleDateString() : "—";

//   return (
//     <div className="p-8 bg-gradient-to-b from-white to-gray-100 min-h-screen">
//       <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
//         📚 My Borrowed Books
//       </h2>

//       {borrowedBooks.length === 0 ? (
//         <p className="text-center text-gray-500">You haven't borrowed any books yet.</p>
//       ) : (
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//           {borrowedBooks.map((book) => (
//             <div
//               key={book.id}
//               className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
//                   <FaBook /> {book.bookTitle}
//                 </h3>
//               </div>

//               <p className="text-sm text-gray-600">
//                 <strong>Borrowed On:</strong> {formatDate(book.borrowDate)}
//               </p>
//               <p className="text-sm">
//                 <strong>Status:</strong>{" "}
//                 {book.returnDate ? (
//                   <span className="text-green-600 flex items-center gap-1">
//                     <FaCheckCircle /> Returned on {formatDate(book.returnDate)}
//                   </span>
//                 ) : (
//                   <span className="text-red-600 flex items-center gap-1">
//                     <FaTimesCircle /> Not Returned
//                   </span>
//                 )}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyBorrowedBooks;



// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";


// interface BorrowedBook {
//   id: number;
//   bookTitle: string;
//   borrowDate: string;
//   returnDate: string | null;
// }

// const MyBorrowedBooks = () => {
//   const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);

//   const {user}=useAuth();


//   useEffect(() => {
//     fetch(`https://localhost:7102/api/borrows/user/${user?.id}`)
//       .then(res => res.json())
//       .then(data => setBorrowedBooks(data));
//   }, [user?.id]);
//   console.log(borrowedBooks)

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">My Borrowed Books</h2>
//       <div className="space-y-2">
//         {borrowedBooks.length === 0 && <p>No borrowed books found.</p>}
//         {borrowedBooks.map(book => (
//           <div key={book.id} className="p-4 bg-gray-100 rounded shadow">
//             <h3 className="font-bold">{book.bookTitle}</h3>
//             <p className="text-sm">Borrow Date: {book.borrowDate}</p>
//             <p className={`text-sm ${book.returnDate ? "text-green-600" : "text-red-600"}`}>
//               {book.returnDate ? `Returned: ${book.returnDate}` : "Not Returned Yet"}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyBorrowedBooks;