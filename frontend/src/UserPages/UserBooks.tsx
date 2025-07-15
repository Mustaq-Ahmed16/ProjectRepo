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
    <div className="p-6">
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
