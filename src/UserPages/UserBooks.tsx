// src/pages/UserBooks.tsx
import { useEffect, useState } from "react";

interface Book {
  id: number;
  title: string;
  genre: string;
  stock: number;
}

const UserBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("https://localhost:7102/api/books")
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available Books</h2>
      <div className="space-y-2">
        {books.map(book => (
          <div key={book.id} className="p-4 bg-white rounded shadow border">
            <h3 className="font-bold text-lg">{book.title}</h3>
            <p className="text-sm text-gray-500">Genre: {book.genre}</p>
            <p className={`text-sm ${book.stock > 0 ? "text-green-600" : "text-red-600"}`}>
              {book.stock > 0 ? `In Stock: ${book.stock}` : "Out of Stock"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBooks;

// import { useEffect, useState } from "react";
// import { FaBook } from "react-icons/fa";

// interface Book {
//   id: number;
//   title: string;
//   genre: string;
//   stock: number;
// }

// const UserBooks = () => {
//   const [books, setBooks] = useState<Book[]>([]);

//   useEffect(() => {
//     fetch("https://localhost:7102/api/books")
//       .then((res) => res.json())
//       .then((data) => setBooks(data));
//   }, []);

//   return (
//     <div className="p-8 bg-gradient-to-b from-white to-gray-100 min-h-screen">
//       <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
//         📚 Available Books
//       </h2>

//       {books.length === 0 ? (
//         <p className="text-center text-gray-500">No books available.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {books.map((book) => (
//             <div
//               key={book.id}
//               className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition duration-300 border border-gray-200"
//             >
//               <div className="flex items-center gap-2 mb-2">
//                 <FaBook className="text-blue-500" />
//                 <h3 className="text-xl font-semibold text-gray-800">
//                   {book.title}
//                 </h3>
//               </div>
//               <p className="text-sm text-gray-600">Genre: {book.genre}</p>
//               <p className="text-sm mt-2">
//                 {book.stock > 0 ? (
//                   <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
//                     In Stock: {book.stock}
//                   </span>
//                 ) : (
//                   <span className="inline-block bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
//                     Out of Stock
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

// export default UserBooks;


// import { useEffect, useState } from "react";

// interface Book {
//   id: number;
//   title: string;
//   genre: string;
//   stock: number;
// }

// const UserBooks = () => {
//   const [books, setBooks] = useState<Book[]>([]);

//   useEffect(() => {
//     fetch("https://localhost:7102/api/books")
//       .then(res => res.json())
//       .then(data => setBooks(data));
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Available Books</h2>
//       <div className="space-y-2">
//         {books.map(book => (
//           <div key={book.id} className="p-4 bg-white rounded shadow border">
//             <h3 className="font-bold text-lg">{book.title}</h3>
//             <p className="text-sm text-gray-500">Genre: {book.genre}</p>
//             <p className={`text-sm ${book.stock > 0 ? "text-green-600" : "text-red-600"}`}>
//               {book.stock > 0 ? `In Stock: ${book.stock}` : "Out of Stock"}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserBooks;