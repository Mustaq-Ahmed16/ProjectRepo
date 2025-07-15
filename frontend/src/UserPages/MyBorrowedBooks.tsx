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

  const {user}=useAuth();


  useEffect(() => {
    fetch(`https://localhost:7102/api/borrows/user/${user?.id}`)
      .then(res => res.json())
      .then(data => setBorrowedBooks(data));
  }, [user?.id]);
  console.log(borrowedBooks)

  return (
    <div className="p-6">
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
